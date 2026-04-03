import React from "react";
import aboutchef from "../../assets/images/about-chef.png"

export default function ChefSection() {
  return (
    <div className="container-about-chef">
      <div className="title-wrap">
        <h2 className="lg-title">Chef Anthony</h2>
      </div>

      <div className="about-chef about-row">
        <div className="about-chef-left">
          <p className="text">
            For Chef Anthony, cooking has always been a conversation between past and present—one that began as a child on the docks of Klang, watching his grandparents turn the day's freshest catch into meals that fed more than hunger. They fed a community. He learned not from books or classrooms, but by observing the quiet poetry of their hands—scaling fish, pounding sambal, ladling steaming laksa with care earned from decades at sea.
          </p>
          <p className="text">
            While other kids played, Anthony stood at his grandfather’s side learning when to salt and when to wait. The stall wasn’t just a kitchen; it was his first classroom, his first stage, his first home. As he grew, so did his palate and his ambition—not to reinvent what they had created, but to elevate it without forgetting where it came from.
          </p>
          <p className="text">
            For him, Laut isn’t just a restaurant. It’s a tribute. It’s a continuation. And most of all, it’s a thank-you—to his grandparents, to the sea, and to every guest who steps into the world they began to build half a century ago.
          </p>
        </div>

        <div className="about-chef-right my-2">
          <img
            src = {aboutchef}
            alt="Chef Anthony in the kitchen"
            className="about-chef-anthony"
          />
        </div>
      </div>
    </div>
  );
}
