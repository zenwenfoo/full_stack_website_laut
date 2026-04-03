import React from "react";

export default function MapSection({
  title = "Treat Yourself with Laut",
  height = 450,
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7967.588098801542!2d101.71083757570922!3d3.14896605315225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362c8935509b%3A0xed966c50b0a79fb4!2sPavilion%20Kuala%20Lumpur!5e0!3m2!1sen!2suk!4v1750731451541!5m2!1sen!2suk"
}) {
  return (
    <section id="map" className="py-4">
      <div className="container">
        <div className="map-title title-wrap">
          <span className="title">{title}</span>
        </div>
        <div className="map-wrap">
          <iframe
            title="Laut location — Pavilion Kuala Lumpur"
            src={src}
            width = "600"
            height = "450"
            style={{ border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
