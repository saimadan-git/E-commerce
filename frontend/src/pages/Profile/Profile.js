import React from "react";
import "./Profile.css";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Welcome, [User's Name]</h1>
      </header>
      <div className="profile-content">
        <section className="user-info">
          <h2>Your Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Member Since:</strong> January 2023</p>
        </section>

        <section className="profile-actions">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/orders">My Orders</a></li>
            <li><a href="/edit-profile">Edit Profile</a></li>
            <li><a href="/settings">Account Settings</a></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </section>
      </div>
      <footer className="profile-footer">
        <p>© 2024 Pickle Paradise. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
