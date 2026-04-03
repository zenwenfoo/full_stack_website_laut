import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutIntro from "../components/about/AboutIntro";
import ChefSection from "../components/about/ChefSection";
import TeamSection from "../components/about/TeamSection";

export default function About() {
    return(
        <>
            <Navbar />
            <Header variant = "sm" title = "About Us" />
            <AboutIntro />
            <ChefSection />
            <TeamSection />
            <Footer />
        </>
    );
}