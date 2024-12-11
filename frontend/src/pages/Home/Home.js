import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="home">
      {/* <Navbar /> */}
      <header className="home-header">
  <div className="home-intro">
    <h1 className="home-title">Welcome to Pickle Paradise!</h1>
    <p className="home-tagline">
      Relish the authentic flavors of handcrafted Hyderabadi pickles, made with love, tradition, and premium ingredients.
    </p>
    <ul className="home-highlights">
      <li>🌟 100% Natural Ingredients</li>
      <li>🇮🇳 Authentic Hyderabadi Recipes</li>
      <li>🚚 Fast & Fresh Delivery</li>
    </ul>
    <a href="/shop" className="btn-shop">
      Explore Our Collection
    </a>
  </div>
  <img
    src="https://img.tatacliq.com/images/i15//437Wx649H/MP000000020494121_437Wx649H_202312171246261.jpeg"
    alt="Pickle Jar"
    className="home-image"
  />
      </header>

      <section className="home-features">
        <h2>Why Our Pickles?</h2>
        <div className="features-list">
          <div className="feature">
            <img src="https://seeklogo.com/images/P/premium-quality-logo-DEF4287864-seeklogo.com.png" alt="Quality" />
            <h3>Premium Quality</h3>
            <p>Only the freshest ingredients go into our jars.</p>
          </div>
          <div className="feature">
            {/* <img src="/assets/images/icon-flavors.png" alt="Flavors" /> */}
            <img src="https://cdn.shopaccino.com/refresh/articles/pickle-374239_l.jpg?v=426" alt="Flavors" />
            <h3>Unique Flavors</h3>
            <p>A wide variety of flavors to satisfy every taste.</p>
          </div>
          <div className="feature">
            <img src="https://www.nutmegnanny.com/wp-content/uploads/2011/11/homemade-pumpkin-butter-4-600x600.jpg" alt="Handcrafted" />
            <h3>Handcrafted</h3>
            <p>Made in small batches for an authentic taste.</p>
          </div>
        </div>
      </section>
      <section className="bachelors-corner">
        <h2>Bachelor’s Corner</h2>
        <p>
          Missing home-cooked meals? We've got you covered! Our pickles bring the taste of home to your plate,
          wherever you are.
        </p>
        <img src="https://img.youtube.com/vi/HRD2-_bU4K0/0.jpg" alt="Bachelors enjoying pickles" />
      </section>
      <section className="home-testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"My career best pickles I've ever tasted!"</p>
            <span>- Jali Reddy From US</span>
          </div>
          <div className="testimonial">
            <p>"Amazing flavors and great quality. Highly recommend!"</p>
            <span>- Madan From Mandhamallama</span>
          </div>
          <div className="testimonial">
            <p>"I can't stop eating them, they're so good!"</p>
            <span>- Mr Shain Paine Koundinya From Khammam</span>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
