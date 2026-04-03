import React from "react";
import { useForm } from "../lib/useForm";
import { apiFetch } from "../lib/api";
import FormField from "./FormField";

const TIMESLOTS = ["12:00-13:30","12:30-14:00","13:00-14:30","13:30-15:00","14:00-15:30","18:00-19:30","18:30-20:00","19:00-20:30","19:30-21:00","20:00-21:30","20:30-22:00","21:00-22:30"];
const today = new Date().toISOString().split("T")[0];

export default function ReservationsForm() {
  const { values, errors, submitting, serverError, setServerError, handleChange, handleSubmit } = useForm({
    initial: { name: "", email: "", phone: "", date: "", time: "", seats: "", notes: "" },
    validate: (v) => {
      const e = {};
      if (!v.name.trim()) e.name = "Your name is required.";
      if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email.";
      if (!v.phone.trim()) e.phone = "Phone number is required.";
      if (!v.date) e.date = "Pick a date.";
      if (!v.time) e.time = "Pick a timeslot.";
      if (!v.seats) e.seats = "Select seat count.";
      return e;
    },
    onSubmit: async (v) => {
      try {
        await apiFetch("/reservations", { method: "POST", body: { ...v, seats: Number(v.seats) } });
        // success -> route to result or show message
        window.location.href = "/reservation-result?status=success";
      } catch (err) {
        // 409 means capacity issue (from your controller)
        if (err.status === 409 && err.data?.available != null) {
          setServerError(`Only ${err.data.available} seats remaining for this timeslot.`);
        } else {
          setServerError(err.message);
        }
        throw err;
      }
    }
  });

  return (
    <section id = "reservation" className="py-4">
        <div className="container">
            <div className="title-wrap">
                <span className="title">Book A Table With Us</span>
                <h2 className="lg-title">Reserve a Table</h2>
            </div>

            <div className="reservations-row">
                <form className=" app-form reservation-form" onSubmit={handleSubmit} noValidate>
                <FormField label="Your Name" error={errors.name}>
                    <input name="name" value={values.name} onChange={handleChange} placeholder="Your Name*" required />
                </FormField>

                <FormField label="Email" error={errors.email}>
                    <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Your Email" />
                </FormField>

                <FormField label="Phone" error={errors.phone}>
                    <input name="phone" value={values.phone} onChange={handleChange} placeholder="Your Phone Number*" required />
                </FormField>

                <FormField label="Date" error={errors.date}>
                    <input type="date" name="date" min={today} value={values.date} onChange={handleChange} required />
                </FormField>

                <FormField label="Timeslot" error={errors.time}>
                    <select name="time" value={values.time} onChange={handleChange} required>
                    <option value="" disabled>Select Timeslot*</option>
                    {TIMESLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </FormField>

                <FormField label="Seats" error={errors.seats}>
                    <select name="seats" value={values.seats} onChange={handleChange} required>
                    <option value="" disabled>Select Seat Count*</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                </FormField>

                <FormField label="Notes">
                    <textarea name="notes" rows="4" style={{ resize: "none" }} value={values.notes} onChange={handleChange} placeholder="Any Preferences? (e.g. allergies, seat preferences)" />
                </FormField>

                {serverError && <p className="text" style={{ color: "#c33" }}>{serverError}</p>}
                <button className="btn" type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Reservation"}</button>
                </form>
            </div>
        </div>
    </section>
  );
}
