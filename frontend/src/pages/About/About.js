import React from "react";
import "./About.css"; // For styling

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Discover the story behind our pickles.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            At <strong>Pickle Paradise</strong>, we take pride in crafting the finest, most flavorful pickles using time-honored recipes and the freshest ingredients. 
            Our journey began with a passion for preserving the rich tradition of pickling while adding our own unique twist.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to bring joy to every bite by offering pickles that are both delicious and made with love. 
            From spicy to sweet, tangy to savory, we strive to cater to every pickle lover's taste.
          </p>
        </div>

        <div className="about-section">
          <h2>Why to Choose Us?</h2>
          <ul>
            <li>All-natural ingredients</li>
            <li>Locally sourced produce</li>
            <li>Handcrafted with care</li>
            <li>Wide range of flavors</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or want to know more? We'd love to hear from you!
          </p>
          <p>
            Email us at: <a href="mailto:info@pickleparadise.com">info@pickleparadise.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;