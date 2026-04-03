import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET /api/users/me
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id).lean();
  if (!user) return res.status(404).json({ error: "User not found" });
  // only expose safe fields
  const { _id, fullName, username, email, phone, avatarUrl, createdAt } = user;
  res.json({ id: _id, fullName, username, email, phone, avatarUrl, createdAt });
};

// PUT /api/users/me  (multipart/form-data allowed)
export const updateMe = async (req, res) => {
  const { fullName, username, email, phone, avatarTemplate } = req.body;
  const updates = {};

  if (fullName !== undefined) updates.fullName = fullName;
  if (username !== undefined) updates.username = username;
  if (email !== undefined) updates.email = email;
  if (phone !== undefined) updates.phone = phone;

  // if a template was chosen (string URL in client assets or CDN)
  if (avatarTemplate) {
    updates.avatarUrl = avatarTemplate;
  }

  // if a file was uploaded
  if (req.file) {
    // store relative path so it can be served from /uploads/…
    updates.avatarUrl = `/uploads/avatars/${req.file.filename}`;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    }).lean();

    const { _id, fullName, username, email, phone, avatarUrl, createdAt } = user;
    res.json({ id: _id, fullName, username, email, phone, avatarUrl, createdAt });
  } catch (err) {
    if (err.code === 11000) {
      // duplicate key (e.g., username/email taken)
      return res.status(400).json({ error: "Username or email already taken" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// PUT /api/users/me/password
export const changePassword = async (req, res) => {
  const { current, next } = req.body;
  if (!current || !next) return res.status(400).json({ error: "Missing fields" });
  if (next.length < 8) return res.status(400).json({ error: "Password too short" });

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const ok = await bcrypt.compare(current, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Current password incorrect" });

  user.passwordHash = await bcrypt.hash(next, 10);
  await user.save();

  res.json({ ok: true });
};
