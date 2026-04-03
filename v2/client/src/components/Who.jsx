import React from 'react';
import { Link } from 'react-router-dom';

import stall from "../assets/images/who-laut-original-stall.png";

export default function Who() {
  return (
    <section id = "who" className="py-4 who">
        <div class="container">
            <div class="title-wrap who-title">
                <h2 class="lg-title">Welcome to Laut</h2>
            </div>
            <div class="who-text">
                <p>Laut’s origins are deeply tied to the rhythm of the sea and the people whose lives depend on it. In 1965, along the bustling docks of Klang, a humble stall stood as a beacon for weary fishermen returning with their fresh catch. Here, Chef Anthony’s grandparents crafted simple yet soulful meals—honest flavors that spoke of home, tradition, and the ocean’s bounty.</p>
                <p>For decades, their stall became more than just a place to eat; it was a meeting ground, a resting spot, a place where stories were exchanged over steaming bowls of seafood laksa and plates piled high with freshly grilled fish. Their dedication to quality and their understanding of flavors—drawn straight from the waters—earned them a loyal following.</p>
                <p>Fast-forward to 2008, and Chef Michael took the heart of that stall and elevated it into something new while honoring everything that made it special. Laut’s first fine-dining restaurant opened in Pavilion, Kuala Lumpur, not just as a tribute but as a continuation of a legacy. Every dish that leaves the kitchen carries the same devotion to freshness, authenticity, and respect for tradition, but now presented with the refinement that modern dining allows.</p>
                <p>What began as a modest food stall has transformed into an experience—one that celebrates Southeast Asian heritage with elevated elegance, while still paying homage to the warm, humble roots from which it grew. Welcome to Laut.</p>
            </div>
            <div class="who-image">
                <img src={stall} alt="Laut Original Stall"/>
            </div>
            <div class="who-button flex">
                <Link to = "/about"><button type = "button">Our Story</button></Link>
            </div>
        </div>
    </section>
  );
}