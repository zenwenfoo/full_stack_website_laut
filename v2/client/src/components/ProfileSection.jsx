import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "../lib/useForm";
import { apiFetch } from "../lib/api";

// Template avatar choices (static)
import avatar1 from "../assets/avatars/avatar-1.png";
import avatar2 from "../assets/avatars/avatar-2.png";
import avatar3 from "../assets/avatars/avatar-3.png";
import avatar4 from "../assets/avatars/avatar-4.png";
import avatar5 from "../assets/avatars/avatar-5.png";
import avatar6 from "../assets/avatars/avatar-6.png";
import avatar7 from "../assets/avatars/avatar-7.png";
import avatar8 from "../assets/avatars/avatar-8.png";

const TEMPLATES = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8];

export default function ProfileSection() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const uploadRef = useRef(null);
  const lastObjectUrl = useRef(null);
  const chosenTemplate = useRef(""); // track current template selection
  const fmtDate = (d) =>
    d ? new Date(d).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "-"
  const getTimeslot = (r) =>
    r.time || r.timeslot || (r.start && r.end ? `${r.start}-${r.end}` : "-")

  // 2.1 Load profile
  useEffect(() => {
    (async () => {
      try {
        const [me, rsvs] = await Promise.all([
          apiFetch("/users/me"),
          apiFetch("/reservations/mine"),
        ]);
        setProfile(me);
        setReservations(
          Array.isArray(rsvs) ? rsvs.map(r => ({ ...r, id: r.id || r._id })) : []
        );
      }catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 2.2 Edit profile form
  const {
    values,
    errors,
    submitting,
    serverError,
    setServerError,
    setValues,
    handleChange,
    handleSubmit,
  } = useForm({
    initial: { fullName: "", username: "", email: "", phone: "" },
    validate: (v) => {
      const e = {};
      if (!v.fullName.trim()) e.fullName = "Full name is required.";
      if (!v.username.trim()) e.username = "Username is required.";
      if (!/^\S+@\S+\.\S+$/.test(v.email || "")) e.email = "Enter a valid email.";
      return e;
    },
    onSubmit: async (v) => {
      setServerMsg("");
      try {
        let body;

        // If a file is selected, send multipart FormData
        const file = uploadRef.current?.files?.[0];
        if (file) {
          const fd = new FormData();
          fd.append("fullName", v.fullName);
          fd.append("username", v.username);
          fd.append("email", v.email);
          fd.append("phone", v.phone || "");
          fd.append("avatar", file);
          body = fd;
        } else if (chosenTemplate.current) {
          // else if template selected, send normal JSON with template url
          body = {
            fullName: v.fullName,
            username: v.username,
            email: v.email,
            phone: v.phone || "",
            avatarTemplate: chosenTemplate.current,
          };
        } else {
          // no avatar change
          body = { ...v };
        }

        const updated = await apiFetch("/users/me", {
          method: "PUT",
          body,
        });

        // update UI
        setProfile(updated);
        setServerMsg("Profile updated successfully.");

        // optional: cache profile for your navbar/local state
        localStorage.setItem("laut_profile", JSON.stringify(updated));

        // clear file + template choice & preview
        if (uploadRef.current) uploadRef.current.value = "";
        chosenTemplate.current = "";
        if (lastObjectUrl.current) {
          URL.revokeObjectURL(lastObjectUrl.current);
          lastObjectUrl.current = null;
        }
        setAvatarPreview("");
        setEditMode(false);
      } catch (err) {
        setServerError(err.message || "Failed to update profile.");
        throw err;
      }
    },
  });

  // 2.3 Enter edit mode
  const startEdit = () => {
    if (!profile) return;
    setValues({
      fullName: profile.fullName || "",
      username: profile.username || "",
      email: profile.email || "",
      phone: profile.phone || "",
    });
    setServerMsg("");
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setServerMsg("");
    if (uploadRef.current) uploadRef.current.value = "";
    chosenTemplate.current = "";
    if (lastObjectUrl.current) {
      URL.revokeObjectURL(lastObjectUrl.current);
      lastObjectUrl.current = null;
    }
    setAvatarPreview("");
  };

  // 2.4 Handle avatar changes
  const onPickTemplate = (src) => {
    chosenTemplate.current = src;
    // clear any file selection + preview
    if (uploadRef.current) uploadRef.current.value = "";
    if (lastObjectUrl.current) {
      URL.revokeObjectURL(lastObjectUrl.current);
      lastObjectUrl.current = null;
    }
    setAvatarPreview(src);
  };

  const onUploadAvatar = (e) => {
    chosenTemplate.current = "";
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
    lastObjectUrl.current = url;
    setAvatarPreview(url);
  };

  useEffect(() => {
    return () => {
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
    };
  }, []);

  // 2.5 Password form
  const pwdForm = useForm({
    initial: { current: "", next: "", confirm: "" },
    validate: (v) => {
      const e = {};
      if (!v.current) e.current = "Enter current password.";
      if (!v.next || v.next.length < 8) e.next = "New password must be at least 8 characters.";
      if (v.next !== v.confirm) e.confirm = "New passwords do not match.";
      return e;
    },
    onSubmit: async (v) => {
      try {
        await apiFetch("/users/me/password", {
          method: "PUT",
          body: { current: v.current, next: v.next },
        });
        pwdForm.setServerError("");
        pwdForm.setValues({ current: "", next: "", confirm: "" });
        setServerMsg("Password updated successfully.");
      } catch (err) {
        pwdForm.setServerError(err.message || "Failed to change password.");
        throw err;
      }
    },
  });

  const createdDate = useMemo(() => {
    if (!profile?.createdAt) return "";
    return new Date(profile.createdAt).toLocaleDateString();
  }, [profile]);

  if (loading) {
    return (
      <section id="register" className="py-4">
        <div className="container">
          <div className="title-wrap">
            <h2 className="lg-title">My Profile</h2>
          </div>
          <p className="text">Loading…</p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section id="register" className="py-4">
        <div className="container">
          <div className="title-wrap">
            <h2 className="lg-title">My Profile</h2>
          </div>
          <p className="text">No profile found.</p>
        </div>
      </section>
    );
  }

  // resolve avatar URL (server file or template URL)
  const resolvedAvatar =
    avatarPreview ||
    profile.avatarUrl ||
    TEMPLATES[0];

  return (
    <section id="register" className="py-4">
      <div className="container">
        <div className="title-wrap">
          <span className="title">Welcome back</span>
          <h2 className="lg-title">My Profile</h2>
        </div>

        {/* View Mode */}
        {!editMode && (
          <div className="registration-row" style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "center" }}>
              <img
                src={resolvedAvatar}
                alt="Profile avatar"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--muted-gold)" }}
              />
              <div>
                <h3 className="title" style={{ margin: 0 }}>{profile.fullName}</h3>
                <p className="text" style={{ margin: ".2rem 0" }}><strong>Username:</strong> {profile.username}</p>
                <p className="text" style={{ margin: ".2rem 0" }}><strong>Email:</strong> {profile.email}</p>
                <p className="text" style={{ margin: ".2rem 0" }}>
                  <strong>Phone:</strong> {profile.phone || <em>Not provided</em>}
                </p>
                <p className="text" style={{ margin: ".2rem 0" }}><strong>Member since:</strong> {createdDate}</p>
              </div>
            </div>

            {serverMsg && <p className="text" style={{ color: "#2b8a3e", marginTop: "1rem" }}>{serverMsg}</p>}
            <div style={{ marginTop: "1rem" }}>
              <button type="button" className="btn" onClick={startEdit}>Edit Profile</button>
            </div>

            <div className="container" style = {{ marginTop: "1.5rem" }}>
              <div className="title-wrap"><h3 className="lg-title">Reservation History</h3></div>

              {reservations.length ? (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                        <th style={{ padding: ".75rem" }}>Date</th>
                        <th style={{ padding: ".75rem" }}>Timeslot</th>
                        <th style={{ padding: ".75rem" }}>Email</th>
                        <th style={{ padding: ".75rem" }}>Seats</th>
                        <th style={{ padding: ".75rem" }}>Notes</th>
                        <th style={{ padding: ".75rem" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: ".75rem" }}>{fmtDate(r.date)}</td>
                          <td style={{ padding: ".75rem" }}>{getTimeslot(r)}</td>
                          <td style={{ padding: ".75rem" }}>{r.email}</td>
                          <td style={{ padding: ".75rem" }}>{r.seats}</td>
                          <td style={{ padding: ".75rem" }}>{r.notes || "-"}</td>
                          <td style={{ padding: ".75rem" }}>{r.status || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text">No reservations yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {editMode && (
          <div className="registration-row">
            <form className="app-form registration-form" onSubmit={handleSubmit} noValidate>
              <input
                className="form-control"
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={values.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && <p className="text" style={{ color:"#c33" }}>{errors.fullName}</p>}

              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="Username*"
                value={values.username}
                onChange={handleChange}
                required
              />
              {errors.username && <p className="text" style={{ color:"#c33" }}>{errors.username}</p>}

              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email Address*"
                value={values.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text" style={{ color:"#c33" }}>{errors.email}</p>}

              <input
                className="form-control"
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={values.phone}
                onChange={handleChange}
              />

              {/* Avatar picker */}
              <div className="form-control" style={{ padding: "1rem" }}>
                <label style={{ display: "block", marginBottom: ".5rem", fontWeight: 600 }}>
                  Profile Picture
                </label>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: ".75rem" }}>
                  <img
                    src={resolvedAvatar}
                    alt="Preview"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--muted-gold)" }}
                  />
                  <input ref={uploadRef} type="file" accept="image/*" onChange={onUploadAvatar} />
                </div>

                <p className="text" style={{ margin: "0 0 .5rem" }}>Or choose a template:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))", gap: ".75rem" }}>
                  {TEMPLATES.map((src, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => onPickTemplate(src)}
                      style={{
                        border: (avatarPreview || profile.avatarUrl) === src ? "2px solid var(--muted-gold)" : "2px solid transparent",
                        borderRadius: "50%",
                        padding: 0, width: 64, height: 64, overflow: "hidden",
                        background: "none", cursor: "pointer",
                      }}
                      title={`Avatar ${i + 1}`}
                    >
                      <img src={src} alt={`Avatar ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </button>
                  ))}
                </div>
              </div>

              {serverError && <p className="text" style={{ color: "#c33" }}>{serverError}</p>}

              <div style={{ display: "flex", gap: ".75rem", justifyContent: "center" }}>
                <button type="submit" className="btn" disabled={submitting}>
                  {submitting ? "Saving…" : "Save Changes"}
                </button>
                <button type="button" className="btn" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Change Password */}
        <div className="registration-row" style={{ marginTop: "2rem" }}>
          <div className="title-wrap"><h3 className="lg-title">Change Password</h3></div>
          <form className="app-form registration-form" onSubmit={pwdForm.handleSubmit} noValidate>
            <input
              className="form-control"
              type="password"
              name="current"
              placeholder="Current Password*"
              value={pwdForm.values.current}
              onChange={pwdForm.handleChange}
              minLength={8}
              required
            />
            {pwdForm.errors.current && <p className="text" style={{ color:"#c33" }}>{pwdForm.errors.current}</p>}

            <input
              className="form-control"
              type="password"
              name="next"
              placeholder="New Password*"
              value={pwdForm.values.next}
              onChange={pwdForm.handleChange}
              minLength={8}
              required
            />
            {pwdForm.errors.next && <p className="text" style={{ color:"#c33" }}>{pwdForm.errors.next}</p>}

            <input
              className="form-control"
              type="password"
              name="confirm"
              placeholder="Confirm New Password*"
              value={pwdForm.values.confirm}
              onChange={pwdForm.handleChange}
              minLength={8}
              required
            />
            {pwdForm.errors.confirm && <p className="text" style={{ color:"#c33" }}>{pwdForm.errors.confirm}</p>}

            {pwdForm.serverError && <p className="text" style={{ color: "#c33" }}>{pwdForm.serverError}</p>}

            <button className="btn" type="submit" disabled={pwdForm.submitting}>
              {pwdForm.submitting ? "Updating…" : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
