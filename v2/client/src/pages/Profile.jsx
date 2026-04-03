import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProfileSection from "../components/ProfileSection";
import Footer from "../components/Footer";

export default function Profile() {
  return (
    <>
      <Navbar />
      <Header variant="sm" title="My Profile" />
      <ProfileSection />
      <Footer />
    </>
  );
}
