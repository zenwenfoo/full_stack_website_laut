import React from 'react';
import { Link } from 'react-router-dom';

import featured1 from "../assets/images/featured-natures-bounty.jpg";
import featured2 from "../assets/images/featured-curry-laksa.jpg";
import featured3 from "../assets/images/featured-prawn-mee.jpg";
import featured4 from "../assets/images/featured-sea-bass.jpg";
import featured5 from "../assets/images/featured-grilled-prawns.jpg";
import featured6 from "../assets/images/featured-steam-clam.jpg";

export default function Featured() {
  return (
    <nav id = "featured" className="py-4">
        <div class="container">
            <div class="title-wrap">
                <span class="sm-title">Taste the Bounty of South East Asia</span>
                <h2 class="lg-title">Discover our Menu</h2>
            </div>

            <div class="featured-row">
                <div class="featured-item my-2 shadow">
                    <img src= {featured1} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Nature's Bounty
                        </span>
                        <div>
                            <p class="text">Our signature medley of the freshest seafood, served with high-quality broth.</p>
                        </div>
                    </div>
                </div>

                <div class="featured-item my-2 shadow">
                    <img src={featured2} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Singapore Curry Crab Laksa
                        </span>
                        <div>
                            <p class="text">Fragrant, crafted with care. Our seafood stock is traditionally prepared and stuffed with fresh crab.</p>
                        </div>
                    </div>
                </div>

                <div class="featured-item my-2 shadow">
                    <img src={featured3} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Malaysian Prawn Mee
                        </span>
                        <div>
                            <p class="text">Bold, deeply savory, and steeped in history and nostalgia. Slow simmered for richness and flavor.</p>
                        </div>
                    </div>
                </div>

                <div class="featured-item my-2 shadow">
                    <img src={featured4} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Steamed Whole Sea Bass
                        </span>
                        <div>
                            <p class="text">Sometimes, simple is best. Gently steamed with generous ginger, scallions, and chillis.</p>
                        </div>
                    </div>
                </div>

                <div class="featured-item my-2 shadow">
                    <img src={featured5} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Thai Grilled Tiger Prawns
                        </span>
                        <div>
                            <p class="text">Fresh Tiger prawns grilled over traditional charcoal to deliver a smoky, addictive aroma. </p>
                        </div>
                    </div>
                </div>

                <div class="featured-item my-2 shadow">
                    <img src={featured6} alt = "featured place"/>
                    <div class="featured-item-content">
                        <span>
                            <i class="fa-solid fa-utensils"></i>
                            Malaysian Stir-Fried Chilli Clams
                        </span>
                        <div>
                            <p class="text">Wok-tossed in a bold, aromatic sauce, delivering deep umami and a hint of heat.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="featured-button flex">
                <Link to = "/menu"><button type = "button">Our Menu</button></Link>
            </div>
        </div>
    </nav>
  );
}
