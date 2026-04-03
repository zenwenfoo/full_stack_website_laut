import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../lib/useForm";
import { apiFetch } from "../lib/api";
import FormField from "./FormField";

export default function RegisterForm() {
  const navigate = useNavigate();

  const { values, errors, submitting, serverError, handleChange, handleSubmit } = useForm({
    initial: { fullName: "", username: "", email: "", password: "", confirmPassword: "", phone: "" },
    validate: (v) => {
      const e = {};
      if (!v.fullName.trim()) e.fullName = "Full name is required.";
      if (!v.username.trim()) e.username = "Username is required.";
      if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email.";
      if (v.password.length < 8) e.password = "Min 8 characters.";
      if (v.password !== v.confirmPassword) e.confirmPassword = "Passwords do not match.";
      return e;
    },
    onSubmit: async (v) => {
      await apiFetch("/auth/register", { method: "POST", body: v });
      navigate("/login", { state: { justRegistered: true } });
    }
  });

  return (
    <section id = "register" className="py-4">
      <div className="container">
        <div className="title-wrap">
          <span className="title">Register With Laut</span>
          <h2 className="lg-title">create an account</h2>
        </div>

        <div className="registration-row">
          <form className="app-form registration-form" onSubmit={handleSubmit} noValidate>
            <FormField label="Full Name" error={errors.fullName}>
              <input name="fullName" value={values.fullName} onChange={handleChange} placeholder="Full Name*" />
            </FormField>
            <FormField label="Username" error={errors.username}>
              <input name="username" value={values.username} onChange={handleChange} placeholder="Username*" />
            </FormField>
            <FormField label="Email" error={errors.email}>
              <input type="email" name="email" value={values.email} onChange={handleChange} placeholder="Email Address*" />
            </FormField>
            <FormField label="Password" error={errors.password}>
              <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password*" />
            </FormField>
            <FormField label="Confirm Password" error={errors.confirmPassword}>
              <input type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} placeholder="Confirm Password*" />
            </FormField>
            <FormField label="Phone (optional)" error={errors.phone}>
              <input name="phone" value={values.phone} onChange={handleChange} placeholder="Phone Number (optional)" />
            </FormField>

            {serverError && <p className="text" style={{ color: "#c33" }}>{serverError}</p>}
            <button className="btn" type="submit" disabled={submitting}>{submitting ? "Registering…" : "Register"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
