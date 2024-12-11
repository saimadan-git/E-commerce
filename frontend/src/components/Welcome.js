// src/WelcomePage.js
import React from 'react';
import './Welcome.css'; // Styling for the welcome page

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to The Pickle Palace!</h1>
        <p>Your one-stop shop for the finest pickles in town.</p>
      </header>
      <div className="pickle-image">
        <img 
          src="https://nativeflavors.in/wp-content/uploads/2023/05/Image-17-600x600.jpeg" // Replace with an actual pickle image URL
          alt="Pickles"
        />
      </div>
      <footer>
        <p className="slogan">Get in a pickle, stay in a pickle!</p>
        <h1>Comming Soon....</h1>
      </footer>
    </div>
  );
};

export default WelcomePage;
