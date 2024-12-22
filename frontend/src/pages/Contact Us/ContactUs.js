import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form Submitted:', formData);
    setSuccessMessage('Thank you for contacting Pickles Paradise! We’ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Drop us a message and we’ll pickle up a reply ASAP!</p>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
