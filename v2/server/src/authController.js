import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const cookieOpts = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false, // set true behind HTTPS in production
  maxAge: 7 * 24 * 60 * 60 * 1000
};

function setNoStore(res) {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
}

export async function register(req, res) {
  try {
    const { fullName, username, email, password, phone } = req.body;
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(409).json({ error: 'Username or email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      username,
      email,
      phone: phone || '',
      passwordHash,
      avatarUrl: ''
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setNoStore(res);
    res
      .cookie('token', token, cookieOpts)
      .status(201)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ error: 'Duplicate username/email' });
    res.status(500).json({ error: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { usernameOrEmail, username, email, password } = req.body;
    const id = (usernameOrEmail ?? username ?? email ?? "").trim();

    if (!id || !password) return res.status(400).json({ error: 'Missing credentials' });

    const user = await User.findOne({
      $or: [{ username: id }, { email: id }]
    });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    setNoStore(res);
    res.cookie('token', token, cookieOpts).json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

export function logout(req, res) {
  setNoStore(res);
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
}
