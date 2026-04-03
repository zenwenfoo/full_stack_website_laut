import React from "react";

export default function FormField({ label, error, children }) {
  const child = React.Children.only(children);
  const merged = React.cloneElement(child, {
    className: [child.props.className, "form-control"].filter(Boolean).join(" "),
  });

  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      {label && <label className="field-label">{label}</label>}
      {merged}
      {error && <p className="field-error text">{error}</p>}
    </div>
  );
}