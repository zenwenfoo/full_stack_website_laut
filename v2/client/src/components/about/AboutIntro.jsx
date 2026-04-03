import React from "react";
import { Link } from "react-router-dom";

import about1 from "../../assets/images/about-img.jpg"

export default function AboutIntro() {
    return (
        <section id = "about" className="py-4">
            <div className="container">
                <div className="title-wrap">
                    <span className="sm-title">Welcome to Laut</span>
                    <h2 className="lg-title">your story</h2>
                </div>

                <div className="about-row">
                    <div className="about-left my-2">
                        <img src = {about1} alt="about img" />
                    </div>

                    <div className="about-right">
                        <h2>Over 2 Decades of Experience</h2>
                        <p className="text">
                            Laut’s story begins not with fine linens or marble countertops, but with wooden stools, sea-soaked aprons, and the tireless rhythm of a fishing village. Our journey started over seven decades ago along the spirited shores of Klang, where Chef Michael’s grandparents served the day’s freshest catch from a humble stall at the docks.
                        </p>
                        <p className="text">
                            For the local fishermen, that stall wasn’t just sustenance. It was community. It was where salt-worn hands met hearty bowls, where laughter rose with steam, and where stories of the sea were exchanged with every bite.
                        </p>
                        <p className="text">
                            In 2008, Chef Anthony took that legacy one step further. With reverence for his roots and a vision for refined coastal cuisine, he opened the first Laut restaurant in Pavilion, Kuala Lumpur. What was once rustic became elevated—without ever losing its soul. Today, Laut pays homage to those early years by preserving the essence of Southeast Asian flavors, while presenting them through a lens of elegance, precision, and creativity.
                        </p>
                        <p className="text">
                            With over 20 years of culinary evolution, Laut remains driven by the same ethos: respect for ingredients, authenticity of flavor, and warmth of service. From the crackle of grilled tiger prawns to the comfort of a crab laksa, every plate we serve is a continuation of a family story that began beside the sea.
                        </p>
                        <p className="text">
                            Come hungry. Leave connected. Welcome to Laut.
                        </p>
                    </div>
                </div>

                <div className="button-wrapper">
                    <div className="about-button">
                        <Link to = "/reservations">
                            <button type = "button">
                                BOOK A TABLE
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
