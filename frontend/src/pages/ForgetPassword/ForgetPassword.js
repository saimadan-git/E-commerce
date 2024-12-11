import React, { useState } from 'react';
import './ForgetPassword.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate an API call for password reset
    if (email) {
      setMessage(`If the email "${email}" is registered, you will receive a password reset link.`);
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="forget-password-container">
      <h1>Forget Password</h1>
      <form onSubmit={handleSubmit} className="forget-password-form">
        <label htmlFor="email">Enter your registered email address</label>
        <input
          type="email"
          id="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="submit-btn">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ForgetPassword;
