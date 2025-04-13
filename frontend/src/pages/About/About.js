import React from "react";
import styles from "./About.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.tagline}>Made with ❤️ at Home. Served with 💫 to You.</p>

        <p className={styles.description}>
          At <strong>Malini Pickles</strong>, every jar tells a story. Born from our kitchen, our pickles are
          handcrafted with care using only <strong>natural ingredients</strong> — no preservatives, no shortcuts.
          We follow <strong>traditional recipes</strong> passed down through generations, ensuring
          each bite is packed with authentic flavor and homemade warmth.
        </p>

        <div className={styles.features}>
          <div className={styles.featureCard}>
            <span>🌿</span>
            <p>100% Natural Ingredients</p>
          </div>
          <div className={styles.featureCard}>
            <span>🏡</span>
            <p>Prepared at Home</p>
          </div>
          <div className={styles.featureCard}>
            <span>🍋</span>
            <p>No Preservatives</p>
          </div>
          <div className={styles.featureCard}>
            <span>⭐</span>
            <p>Unmatched Quality</p>
          </div>
        </div>

        <div className={styles.closingNote}>
          <p>
            We're not just selling pickles — we're sharing our heritage. Thank you for making us a part of your meals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
