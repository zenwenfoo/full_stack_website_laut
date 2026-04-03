import React, { useState } from "react";
import { useForm } from "../lib/useForm";
import { apiFetch } from "../lib/api";

export default function SubscribeForm() {
  const [ok, setOk] = useState(false);

  const {
    values, errors, submitting, serverError,
    setServerError, setValues, handleChange, handleSubmit
  } = useForm({
    initial: { email: "", hp: "" }, // hp = honeypot
    validate: (v) => {
      const e = {};
      if (v.hp) e.email = "Bot detected";
      if (!/^\S+@\S+\.\S+$/.test(v.email || "")) e.email = "Enter a valid email.";
      return e;
    },
    onSubmit: async (v) => {
      try {
        await apiFetch("/subscribe", { method: "POST", body: { email: v.email } });
        setOk(true);
        setValues({ email: "", hp: "" });
        setServerError("");
      } catch (err) {
        setOk(false);
        setServerError(err.message || "Could not subscribe. Please try again.");
        throw err;
      }
    }
  });

  return (
    <div className="subscribe-form footer-item">
      <h2>Subscribe for Tasty Bites!</h2>

      {/* success message */}
      {ok && (
        <p className= {`subscribe-status ${ok ? "ok": "err"}`} style={{ color: "#2b8a3e" }} aria-live="polite">
          Thanks for subscribing!
        </p>
      )}

      {/* error message */}
      {serverError && (
        <p className= {`subscribe-status ${ok ? "ok": "err"}`} style={{ color: "#c33" }} aria-live="assertive">
          {serverError}
        </p>
      )}

      <form className="flex" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control"
          value={values.email}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.email)}
        />
        <input
          type="submit"
          className="btn"
          value={submitting ? "Subscribing…" : ok ? "Subscribed!" : "Subscribe"}
          disabled={submitting}
        />

        {/* simple honeypot for bots */}
        <input
          type="text"
          name="hp"
          value={values.hp}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
          aria-hidden="true"
        />
      </form>

      {/* inline field error if you want it visible */}
      {errors.email && (
        <p className="text" style={{ color: "#c33", marginTop: ".5rem" }}>{errors.email}</p>
      )}
    </div>
  );
}
