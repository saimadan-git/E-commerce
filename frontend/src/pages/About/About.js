import React from "react";
import styles from "./About.module.css"; // Create a CSS module for styling
import pickleJar from "../../assests/images/Mango-pickle.png"; // Add an image in the assets folder

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1>A Taste of Tradition, Made with Love ❤️</h1>
        <p>Bringing the authentic flavors of homemade pickles to your doorstep!</p>
        <a href="/products" className={styles.shopNowButton}>Shop Now</a>
      </section>

      {/* Our Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <img src={pickleJar} alt="Homemade Pickles" className={styles.storyImage} />
          <div className={styles.storyText}>
            <h2>Our Story</h2>
            <p>
              Our journey began with a simple passion—creating delicious, homemade pickles using time-tested family recipes.
              Prepared in our own kitchen, each jar is a labor of love, made with the freshest ingredients and traditional methods.
              What started as a small family tradition is now a mission to bring high-quality, authentic pickles to every home.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className={styles.specialSection}>
        <h2>What Makes Us Special? 🌟</h2>
        <div className={styles.specialGrid}>
          <div className={styles.specialItem}>
            <span>🌿</span>
            <h3>100% Natural Ingredients</h3>
            <p>No preservatives, only fresh spices & organic ingredients.</p>
          </div>
          <div className={styles.specialItem}>
            <span>🏡</span>
            <h3>Homemade with Love</h3>
            <p>Crafted in small batches for an authentic taste.</p>
          </div>
          <div className={styles.specialItem}>
            <span>📜</span>
            <h3>Authentic Recipes</h3>
            <p>Inspired by traditional family recipes.</p>
          </div>
          <div className={styles.specialItem}>
            <span>🛡️</span>
            <h3>Hygienic Preparation</h3>
            <p>Maintaining the highest quality standards.</p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className={styles.commitmentSection}>
        <h2>Our Commitment 🛡️</h2>
        <p>
          We don’t just make pickles; we make memories. Our mission is to deliver high-quality, homemade pickles 
          that remind you of home. From ingredient selection to packaging, every step is done with care to ensure 
          freshness and taste in every bite.
        </p>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2>Ready to experience the taste of home?</h2>
        <a href="/products" className={styles.ctaButton}>Order Your Pickles Now</a>
      </section>
    </div>
  );
};

export default AboutUs;
