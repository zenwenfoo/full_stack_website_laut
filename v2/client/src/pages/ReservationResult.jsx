import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ReservationResult() {
  const location = useLocation();
  const navigate = useNavigate();

  // read status from route state or ?status=success|error
  const statusFromState = location.state?.status;
  const statusFromQuery = new URLSearchParams(location.search).get("status");
  const status = statusFromState || statusFromQuery || "unknown";

  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <>
      <Navbar />
      <Header variant="sm" title="Reservation Status" />

      <section className="py-4">
        <div className="container" style={{ textAlign: "center" }}>
          {isSuccess && (
            <>
              <div className="title-wrap">
                <h2 className="lg-title">Reservation Submitted 🎉</h2>
              </div>
              <p className="text">Thanks! We’ll email you a confirmation shortly.</p>
              <div style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem", justifyContent: "center" }}>
                <button className="btn" onClick={() => navigate("/")}>Back to Home</button>
                <button className="btn" onClick={() => navigate("/profile")}>Go to Profile</button>
              </div>
            </>
          )}

          {isError && (
            <>
              <div className="title-wrap">
                <h2 className="lg-title">Something went wrong</h2>
              </div>
              <p className="text">Please try submitting your reservation again.</p>
              <div style={{ marginTop: "1.5rem" }}>
                <button className="btn" onClick={() => navigate("/reservations")}>
                  Back to Reservation Form
                </button>
              </div>
            </>
          )}

          {!isSuccess && !isError && (
            <>
              <div className="title-wrap">
                <h2 className="lg-title">Reservation</h2>
              </div>
              <p className="text">We couldn’t determine the status. Please try again.</p>
              <div style={{ marginTop: "1.5rem" }}>
                <button className="btn" onClick={() => navigate("/reservations")}>
                  Back to Reservation Form
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
