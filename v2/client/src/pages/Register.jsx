import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import RegisterSection from "../components/RegisterSection";
import Footer from "../components/Footer";

export default function Register() {
    return (
        <>
            <Navbar />
            <Header variant = "sm" title = "Registration" />
            <RegisterSection />
            <Footer />
        </>
    )
}