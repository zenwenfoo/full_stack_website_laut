import Subscriber from "../models/Subscriber.js";

export async function subscribe(req, res) {
  const { email } = req.body || {};
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email" });
  }
  try {
    // idempotent: if already subscribed, still return ok
    await Subscriber.updateOne(
      { email: email.toLowerCase() },
      { $setOnInsert: { email: email.toLowerCase(), ip: req.ip } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (err) {
    if (err.code === 11000) return res.json({ ok: true });
    console.error("subscribe error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
