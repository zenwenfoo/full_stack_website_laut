import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header"; 
import ContactSection from "../components/contact/ContactSection";
import MapSection from "../components/contact/MapSection";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <Header variant="sm" title="Contact Us" />
      <ContactSection />
      <MapSection />
      <Footer />
    </>
  );
}
