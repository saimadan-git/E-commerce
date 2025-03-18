import React, {useContext, useEffect} from "react";
import "./Home.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import {jwtDecode} from 'jwt-decode';
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {

  const { login } = useContext(AuthContext);

  useEffect(() => {
    // Check if the URL contains query parameters for success or error messages
    const urlParams = new URLSearchParams(window.location.search);
    // If success parameter exists
    if (urlParams.has("success")) {
      notifySuccess("Successfully logged in with Google!");
      const token = urlParams.get("token"); // Save the token if it's included
      if (token) {
        const user = jwtDecode(token); // Extract user details
        login(user, token); // Log in the user
      }
      // Use a small delay before clearing the query params
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname);
      }, 100); // Adjust delay if needed
    }

    // If error parameter exists
    if (urlParams.has("error")) {
      notifyError(urlParams.get("error"));
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname); // Clear the query params
      }, 100); // Adjust delay if needed
    }
  }, []);
  return (
    <div className="home">

      {/* New Year Banner */}
      {/* <div className="new-year-banner">
        <h1>🎉 Happy New Year 2025! 🎉</h1>
        <p>Celebrate this New Year with our special offers and exclusive pickles collection!</p>
      </div> */}

      <header className="home-header">
        <div className="home-intro">
          <h1 className="home-title">Welcome to Malini Foods!</h1>
          <p className="home-tagline">
            Relish the authentic flavors of handcrafted Hyderabadi pickles, made with love, tradition, and premium ingredients.
          </p>
          <ul className="home-highlights">
            <li>🌟 100% Natural Ingredients</li>
            <li>📜 Traditional Telangana & Andhra Delicacies</li>
            <li>🍽️ Handcrafted with the Finest Hygienic Standards</li>
            <li>🔥 Packed with Spicy and Flavorful Goodness</li>
            <li>👌 Unmatched Quality and Taste in Every Jar</li>
            <li>❤️ Made with Love & Care</li>
          </ul>
          <Link to="/shop" className="btn-shop">
            Explore Our Collection
          </Link>
        </div>
        <img
          src="https://img.tatacliq.com/images/i15//437Wx649H/MP000000020494121_437Wx649H_202312171246261.jpeg"
          alt="Pickle Jar"
          className="home-image"
        />
      </header>

      {/* Limited-Time Offer Section */}
      {/* <section className="home-new-year-offer">
        <h2>🌟 New Year Special Offer! 🌟</h2>
        <p>
          Get <strong>25% off</strong> on all our products until January 15th, 2025. Start your year with the taste of home!
        </p>
        <a href="/shop" className="btn-shop-special">
          Grab the Offer Now
        </a>
      </section> */}

      <section className="home-features">
        <h2>Why Our Pickles?</h2>
        <div className="features-list">
          <div className="feature">
            <img src="https://img.freepik.com/premium-vector/premium-quality-stamp-seal-vector-template_917138-3961.jpg" alt="Quality" />
            <h3>Premium Quality</h3>
            <p>Only the freshest ingredients go into our jars.</p>
          </div>
          <div className="feature">
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

      {/* Contact Us Section */}
      <section className="home-contact">
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Reach out to us for inquiries, feedback, or to share your pickle stories.</p>
        <div className="contact-details">
          <p><strong>Email:</strong> support@malinifoods.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Address:</strong> Malini Foods, Plot No. 12, Jubilee Hills, Hyderabad, India</p>
        </div>
        <div className="social-links">
          <a href="mailto:support@malinifoods.com" className="btn-contact">
            Send Us an Email
          </a>
          <div className="social-icons">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon youtube">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/YouTube_icon_%282013-2017%29.png/512px-YouTube_icon_%282013-2017%29.png" alt="YouTube" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;