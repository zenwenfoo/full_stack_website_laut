import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ReservationsSection from "../components/ReservationsSection";
import Footer from "../components/Footer";

export default function Reservations() {
    return(
        <>
            <Navbar />
            <Header variant = "sm" title = "Reservations" />
            <ReservationsSection />
            <Footer />
        </>
    );
}