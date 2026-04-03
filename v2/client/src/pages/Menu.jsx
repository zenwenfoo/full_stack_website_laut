import React from "react";
import Navbar from "../components/Navbar";
import MenuSection from "../components/MenuSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Menu() {
    return(
        <>
            <Navbar />
            <Header variant = "sm" title = "Our Menu"/>
            <MenuSection />
            <Footer />
        </>
    );
}