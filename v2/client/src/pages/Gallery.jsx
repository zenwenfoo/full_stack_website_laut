import React from "react";
import Navbar from "../components/Navbar";
import Gallery from "../components/GallerySection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Menu() {
    return(
        <>
            <Navbar />
            <Header variant = "sm" title = "Gallery"/>
            <Gallery />
            <Footer />
        </>
    );
}