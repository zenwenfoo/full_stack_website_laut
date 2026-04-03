import ContactMessage from "../models/ContactMessage.js";
import { sendContactEmail } from "../utils/mailer.js";

export async function submitContact(req, res) {
  try {
    const { name, email, phone, message } = req.body || {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email and message are required." });
    }

    // save to DB
    const doc = await ContactMessage.create({ name, email, phone, message });

    // send email (don’t fail the request if SMTP breaks)
    try {
      await sendContactEmail({ name, email, phone, message });
    } catch (err) {
      console.error("Email send error:", err.message);
    }

    return res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to submit contact form." });
  }
}
