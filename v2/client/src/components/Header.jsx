import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({
  variant = 'full',                
  title = 'Dine With Us',
  subtitle,
  showCTA = true,
  ctaTo = '/reservations',
  ctaLabel = 'Make a Reservation',
}) {
  const isSmall = variant === 'sm';

  return (
    <header className={`flex ${isSmall ? 'header-sm' : ''}`}>
      <div className="container">
        <div className="header-title">
          <h1>{title}</h1>
          {!isSmall && subtitle && <p>{subtitle}</p>}
        </div>

        {!isSmall && showCTA && (
          <div className="header-button">
            <Link to={ctaTo}>
              <button type="button">{ctaLabel}</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
