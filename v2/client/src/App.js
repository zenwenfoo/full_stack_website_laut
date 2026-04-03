import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import ReservationResult from "./pages/ReservationResult";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  useEffect(() => {
  fetch("/api/health", { cache: "no-store" })
    .then(r => r.json())
    .then(console.log)
    .catch(console.error);
}, []);



  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/menu" element = {<Menu />} />
        <Route path = "/about" element = {<About />} />
        <Route path = "/reservations" element = {<Reservations />} />
        <Route path = "/reservation-result" element = {<ReservationResult />} />
        <Route path = "/contact" element = {<Contact />} />
        <Route path = "/gallery" element = {<Gallery />} />
        <Route path = "/register" element = {<Register />} />
        <Route path = "/login" element = {<Login />} />
        <Route 
          path = "/profile" 
          element = {
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}