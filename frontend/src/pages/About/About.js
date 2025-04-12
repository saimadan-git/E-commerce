import React from "react";
import styles from "./About.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.subheading}>Crafting Pickles with Passion & Purity</p>

      <p className={styles.description}>
        Welcome to our pickle paradise! 🌶️
        <br /><br />
        We are a small, home-based brand dedicated to making high-quality pickles using
        only natural, fresh ingredients. Every jar is handcrafted with care,
        following age-old recipes that bring back the nostalgic taste of tradition.
        Our mission is to deliver health, flavor, and love to your plate—one bite at a time.
      </p>

      <div className={styles.featureGrid}>
        <div className={styles.feature}>
          <span>🌿</span>
          <p>100% Natural Ingredients</p>
        </div>
        <div className={styles.feature}>
          <span>🏠</span>
          <p>Homemade with Love</p>
        </div>
        <div className={styles.feature}>
          <span>📜</span>
          <p>Authentic Family Recipes</p>
        </div>
        <div className={styles.feature}>
          <span>❤️</span>
          <p>Quality First, Always</p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <p>Ready to taste the tradition?</p>
        <a href="/products" className={styles.ctaButton}>Explore Our Pickles</a>
      </div>
    </div>
  );
};

export default AboutUs;
