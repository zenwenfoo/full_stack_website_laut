import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../lib/useForm";
import { apiFetch } from "../lib/api";
import FormField from "./FormField";

export default function LoginForm() {
  const navigate = useNavigate();

  const { values, errors, submitting, serverError, handleChange, handleSubmit } = useForm({
    initial: { username: "", password: "" },
    validate: (v) => {
      const e = {};
      if (!v.username.trim()) e.username = "Username is required.";
      if (!v.password) e.password = "Password is required.";
      return e;
    },
    onSubmit: async (v) => {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: { usernameOrEmail: v.username, password: v.password }
      });
      localStorage.setItem("laut_auth", JSON.stringify(data));
      window.dispatchEvent(new Event("laut-auth-change"));
      navigate("/profile");
    }
  });

  return (
    <section id = "register" className="py-4">
      <div className="container">
        <div className="title-wrap">
          <span className="title">view your account</span>
          <h2 className="lg-title">log in</h2>
        </div>

        <div className="registration-row">
          <form className="app-form registration-form" onSubmit={handleSubmit} noValidate>
            <FormField label="Username" error={errors.username}>
              <input name="username" value={values.username} onChange={handleChange} placeholder="Username" />
            </FormField>
            <FormField label="Password" error={errors.password}>
              <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password*" />
            </FormField>
            {serverError && <p className="text" style={{ color: "#c33" }}>{serverError}</p>}
            <button className="btn" type="submit" disabled={submitting}>{submitting ? "Logging in…" : "Log In"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
