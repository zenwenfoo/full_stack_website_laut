import React from 'react';
import { Link } from 'react-router-dom';
import SubscribeForm from "./SubscribeForm";

export default function Footer() {
  return (
    <footer className="py-4">
      <div className="container footer-row">
        <div className="footer-item">
          <Link to="/" className="site-brand">Laut</Link>
          <p className="text">
            Laut brings the essence of Southeast Asia to your table...
          </p>
        </div>

        <div className="footer-item footer-socials">
          <h2>Follow us on: </h2>
          <ul className="social-links">
            <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://x.com/home"><i className="fab fa-x-twitter"></i></a></li>
            <li><a href="https://uk.pinterest.com/"><i className="fab fa-pinterest"></i></a></li>
            <li><a href="https://www.google.com/"><i className="fab fa-google-plus"></i></a></li>
          </ul>
        </div>

        <SubscribeForm />
      </div>
    </footer>
  );
}
