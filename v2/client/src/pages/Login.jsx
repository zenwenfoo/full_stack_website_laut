import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import LoginSection from "../components/LoginSection";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <>
      <Navbar />
      <Header variant="sm" title="Log In" />
      <LoginSection />
      <Footer />
    </>
  );
}
