import React, { useState } from "react";
import { useForm } from "../../lib/useForm";
import { apiFetch } from "../../lib/api";
import FormField from "../FormField";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const {
    values,
    errors,
    submitting,
    serverError,
    setServerError,
    handleChange,
    handleSubmit,
  } = useForm({
    initial: { name: "", email: "", phone: "", message: "" },
    validate: (v) => {
      const e = {};
      if (!v.name.trim()) e.name = "Your name is required.";
      if (!/^\S+@\S+\.\S+$/.test(v.email || "")) e.email = "Valid email is required.";
      if (!v.message.trim()) e.message = "Please enter a message.";
      return e;
    },
    onSubmit: async (v) => {
      try {
        // NOTE: if your apiFetch already prefixes "/api", use "/contact" (not "/api/contact")
        await apiFetch("/contact", { method: "POST", body: v });
        setSubmitted(true);
      } catch (err) {
        setServerError(err.message);
        throw err;
      }
    },
  });

  return (
    <section id="contact" className="py-4">
      <div className="container">
        <div className="title-wrap">
          <span className="title">get in touch with us</span>
          <h2 className="lg-title">contact us</h2>
        </div>

        <div className="contact-row">
          <div className="contact-left">
            {submitted ? (
              <div className="text" style={{ textAlign: "center" }}>
                <p>Thanks for reaching out! We’ll get back to you soon.</p>
              </div>
            ) : (
              <form className="app-form contact-form" onSubmit={handleSubmit} noValidate>
                <FormField label="Your Name" error={errors.name}>
                  <input
                    className="form-control"
                    name="name"
                    placeholder="Your Name*"
                    value={values.name}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <FormField label="Your Email" error={errors.email}>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Your Email*"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <FormField label="Phone">
                  <input
                    className="form-control"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </FormField>

                <FormField label="Your Message" error={errors.message}>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="4"
                    style={{ resize: "none" }}
                    placeholder="Your Message*"
                    value={values.message}
                    onChange={handleChange}
                    required
                  />
                </FormField>

                {serverError && (
                  <p className="text" style={{ color: "#c33" }}>{serverError}</p>
                )}

                <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
          <div className="contact-right my-2">
            <div className="contact-item">
                <span className="contact-icon flex">
                    <i className = "fa fa-phone-alt"></i>
                </span>
                <div>
                    <span>Phone</span>
                    <p className="text">+6013 456 7891</p>
                </div>
            </div>
            <div class="contact-item">
                <span className="contact-icon flex">
                    <i className = "fa fa-map-marked-alt"></i>
                </span>
                <div>
                    <span>Address</span>
                    <p className="text">Lot 7.102.00, Level 7 Pavilion, Elite KL, 168, Jln Bukit Bintang, 55100 Kuala Lumpur, Federal Territory of Kuala Lumpur, Malaysia</p>      
                </div>
            </div>
            <div className="contact-item">
                <span className="contact-icon flex">
                    <i className="fa fa-envelope"></i>
                </span>
                <div>
                    <span>Message</span>
                    <p className="text">contact@laut.com</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
