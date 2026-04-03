import React, { useEffect, useRef } from "react";

// Small helper: add .visible to children with .fade-in when they enter viewport
function useFadeInOnScroll(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = root.querySelectorAll(".fade-in");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

export default function TeamSection() {
  const rootRef = useRef(null);
  useFadeInOnScroll(rootRef);

  return (
    <div ref={rootRef} className="container staff">
      <div className="title-wrap">
        <h2 className="lg-title">Team Laut</h2>
      </div>

      {/* FOH */}
      <div className="foh-section">
        <div className="foh fade-in">
          <h3 className="title-wrap">FOH</h3>
        </div>

        <h4 className="title-wrap fade-in underline-hover">Suraya Lim - Restaurant Manager</h4>
        <p className="text">
          Raised in Penang and seasoned by years managing boutique hotels in Langkawi, Suraya brings elegance, intuition, and just the right amount of sass. A natural host, she sees every guest as family and every service hiccup as a puzzle to elegantly solve.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Aaron Tan - Assistant Restaurant Manager</h4>
        <p className="text fade-in">
          Formerly a marine biologist who swapped lab coats for linen aprons after falling in love with hospitality (and sambal). Aaron is calm, data-driven, and deeply attentive to both team morale and turn-time analytics.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Jaya Dass - Head Waiter</h4>
        <p className="text fade-in">
          Born in Klang, Jaya once waited tables at Chef Anthony’s grandparents’ stall as a teenager. Now in his forties, he knows every regular by name and instinctively senses when it’s time to clear, refill, or charm with a joke. A true anchor in the dining room.
        </p>
      </div>

      {/* Kitchen */}
      <div className="kitchen-section">
        <div className="kitchen fade-in">
          <h3 className="title-wrap">Kitchen</h3>
        </div>

        <h4 className="title-wrap fade-in underline-hover">Chef Anthony Lim - Head Chef</h4>
        <p className="text fade-in">
          You know this one—his story is woven into the soul of Laut. Raised on the docks, trained across Asia, and devoted to elevating his family’s legacy with every smoky wok flip and perfectly balanced tamarind reduction.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Chef Mei Lian Ong - Sous Chef</h4>
        <p className="text fade-in">
          Fierce, focused, and never seen without her sharpest blades. Mei Lian studied in Singapore and trained under a Kyoto kaiseki master. She balances discipline with heart, managing the line with both precision and quiet encouragement.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Chef Hung "Boi-Boi" Tran - Wok Chef</h4>
        <p className="text fade-in">
          Nicknamed after his childhood snack of choice, Boi-Boi is a Hanoi native who treats the wok like an extension of his soul. His fire control is legendary—dishes seared in seconds, flames dancing like theatre. He speaks little, but lets his sizzling pans do the talking.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Chef Rizal "Zal" Kamaruddin - Grill Chef</h4>
        <p className="text fade-in">
          A former satay vendor from Johor, Zal commands the grill with streetwise rhythm and instinct. He’s got charcoal in his veins and a grin that spreads wider than his skewers. From sambal stingray to soy-glazed tiger prawns—this man knows flame.
        </p>

        <h4 className="title-wrap fade-in underline-hover">Chef Nila Varman - Dessert Chef</h4>
        <p className="text fade-in">
          Inspired by her grandmother’s Sri Lankan sweets, Nila infuses tradition into modern elegance. Think coconut mousse with pandan sponge or smoky gula melaka brittle. She’s a quiet perfectionist with a sweet tooth and an even sweeter plating style.
        </p>
      </div>
    </div>
  );
}
