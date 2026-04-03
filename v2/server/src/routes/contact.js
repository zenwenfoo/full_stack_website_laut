import express from "express";
import ContactMessage from "../models/ContactMessage.js";
import { sendContactEmail } from "../utils/mailer.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name = "", email = "", phone = "", message = "" } = req.body || {};

    // simple server-side validation (mirrors your client)
    if (!name.trim()) return res.status(400).json({ error: "Name is required" });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Valid email is required" });
    if (!message.trim()) return res.status(400).json({ error: "Message is required" });

    // save to DB
    const doc = await ContactMessage.create({ name, email, phone, message });

    // send notification email (captured by Mailtrap in dev)
    await sendContactEmail({ name, email, phone, message });

    res.json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong sending your message." });
  }
});

export default router;
