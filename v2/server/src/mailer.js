import nodemailer from "nodemailer";

function makeTransport() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }
  // fallback so dev still “works” without SMTP
  return nodemailer.createTransport({ jsonTransport: true });
}

const transporter = makeTransport();

export async function sendContactEmail({ name, email, phone, message }) {
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  const from =
    process.env.CONTACT_FROM ||
    "Laut Website <no-reply@laut.local>";

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: email,
    subject: `[Laut] New contact message from ${name}`,
    text: `Name: ${name}
Email: ${email}
Phone: ${phone || "-"}

Message:
${message}
`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap">${message}</pre>
    `,
  });

  return info;
}
