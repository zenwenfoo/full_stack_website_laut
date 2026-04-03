import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Featured from "../components/Featured";
import Who from "../components/Who";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
    return(
        <>
            <Navbar />
            <Header 
                variant = "full"
                title = "Dine With Us"
                subtitle = "Immerse yourself in the rich flavours of Southeast Asia's coastal heritage. At Laut, we celebrate the vibrant essence of the sea, bringing you the freshest seafood infused with time-honoured spices and traditions."
                showCTA
                ctaTo = "/reservations"
                ctaLabel = "Make a Reservation"
            />
            <Featured />
            <Who />
            <Testimonials/>
            <Footer />
        </>
    );
}