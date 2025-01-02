import React, { useState } from "react";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import '../../styles/AuthPages.css';
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await api.post("/auth/forgot-password", { email });
      if (response.data.status === "success") {
        notifySuccess("Email sent successfully! Please check your inbox.");
        navigate("/reset-password");
      } else {
        notifyError("Failed to send the email. Try again later.");
      }
    } catch (err) {
      console.error(err.message);
      notifyError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p>Enter your email address and we’ll send you a link to reset your password.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
            {error && <p className="error-message">{error}</p>}
          </div>
          <button type="submit" className="button login-button">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
