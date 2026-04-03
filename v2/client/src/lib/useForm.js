import { useState } from "react";

export function useForm({ initial, validate, onSubmit }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setValues(v => ({
      ...v,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validate ? validate(values) : {};
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return { values, setValues, errors, setErrors, submitting, serverError, setServerError, handleChange, handleSubmit };
}