import React from 'react';
import './Home2.css';

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Pickle Paradise</h1>
          <p>
            Bringing you the taste of home—<b>hygienic, affordable, and delicious.</b>
          </p>
          <button className="cta-btn shop-now-btn">Shop Now</button>
          <button className="cta-btn learn-more-btn">Learn More</button>
        </div>
        <div className="hero-image">
          <img src="https://savithrammas.com/site/image/cache/catalog/A-Guide-to-Savithrammas-Exotic-Pickles-and-Spices-1080x540.jpg" alt="Pickles" />
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="usp-section">
        <h2>Why Choose Us?</h2>
        <div className="usp-container">
          <div className="usp-item">
            <img src="/images/hygiene-icon.png" alt="Hygiene" />
            <p>Prepared with utmost hygiene and care.</p>
          </div>
          <div className="usp-item">
            <img src="/images/taste-icon.png" alt="Taste" />
            <p>Authentic taste that feels like home.</p>
          </div>
          <div className="usp-item">
            <img src="/images/value-icon.png" alt="Value" />
            <p>Every penny is worth the flavor and quality.</p>
          </div>
        </div>
      </section>

      {/* Bachelor’s Corner */}
      <section className="bachelors-corner">
        <h2>Bachelor’s Corner</h2>
        <p>
          Missing home-cooked meals? We've got you covered! Our pickles bring the taste of home to your plate,
          wherever you are.
        </p>
        <img src="/images/bachelors-corner.jpg" alt="Bachelors enjoying pickles" />
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Our Best Sellers</h2>
        <div className="products-grid">
          <div className="product-item">
            <img src="/images/pickle1.jpg" alt="Mango Pickle" />
            <p>Mango Pickle</p>
          </div>
          <div className="product-item">
            <img src="/images/pickle2.jpg" alt="Lemon Pickle" />
            <p>Lemon Pickle</p>
          </div>
          <div className="product-item">
            <img src="/images/pickle3.jpg" alt="Garlic Pickle" />
            <p>Garlic Pickle</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="reviews-section">
        <h2>What Our Customers Say</h2>
        <div className="reviews-grid">
          <div className="review-item">
            <p>"The best pickles I've ever had! Feels like mom made it."</p>
            <span>- Ravi, Bangalore</span>
          </div>
          <div className="review-item">
            <p>"Affordable and absolutely delicious! Perfect for my meals."</p>
            <span>- Priya, Hyderabad</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
