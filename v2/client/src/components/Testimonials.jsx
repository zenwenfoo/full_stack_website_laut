import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';

// Swiper import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

// Images import 
import star from "../assets/images/test-news-1.png";
import bangkok from "../assets/images/test-news-2.png";
import asia from "../assets/images/test-news-3.png";
import straits from "../assets/images/test-news-4.png";
import trip from "../assets/images/test-news-5.png";

const press = [
  { img: star, name: 'The Star', quote: '"Southeast Asia has its own Marco Pier White"' },
  { img: bangkok, name: 'Bangkok Post', quote: '"Masterful reimagining of traditional flavors"' },
  { img: asia, name: 'Asia Times', quote: '"A love letter to Southeast Asian cuisine"' },
  { img: straits, name: 'The Straits Times', quote: '"Laut captures the essence of the sea with bold, inventive flavours"' },
  { img: trip, name: 'Trip Advisor', quote: "'If you're ever in Kuala Lumpur, a must-visit stop on your journey!'" },
];

const reviews = [
  { quote: 'The Curry Crab laksa alone is worth the visit. Bold, rich, and unforgettable.', name: 'Sammy', sub: '"We WILL be back"' },
  { quote: 'Feels like a taste of home, but elevated beyond expectations.', name: 'Jason', sub: '"Evokes Nostalgia!"' },
  { quote: 'Service was warm, the ambiance inviting, and the food? Simply outstanding.', name: 'Daniel', sub: '"Money WELL spent"' },
  { quote: 'Every dish was a masterpiece—authentic flavors and impeccable presentation.', name: 'Jasmine', sub: '"Just WOW"' },
  { quote: 'Chef Anthony took my childhood and created a masterpiece of flavours.', name: 'Emily', sub: '"MUST try if you come to KL"' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-4">
      <div className="container">
        <div className="title-wrap">
          <span className="sm-title-alt">Real stories, real flavors—see why our guests keep coming back.</span>
          <h2 className="test-title">reviews</h2>
        </div>

        {/* Press quotes slider (coverflow) */}
        <div className="testimony-news-row">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: false }}
            breakpoints={{ 768: { slidesPerView: 3, spaceBetween: 30 } }}
          >
            {press.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="test-news-item">
                  <div className="test-item-info">
                    <img src={item.img} alt={item.name} />
                  </div>
                  <h2>{item.name}</h2>
                  <p className="text">{item.quote}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Guest reviews slider */}
        <div className="testimony-row">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 1400: { slidesPerView: 3, spaceBetween: 30 } }}
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i}>
                <div className="test-item">
                  <p className="text">{r.quote}</p>
                  <div className="test-item-info">
                    <h3>{r.name}</h3>
                    <p className="text">{r.sub}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
