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
    let error = "";
    if (!email) {
      error = "Email is required.";
    } else if (!emailRegex.test(email)) {
      error = "Please enter a valid email address.";
    }
    return error;
  };

  // Handle Input Change and Validate in Real-Time
  const handleInputChange = (e) => {
    const { value } = e.target;
    // Update Form Data
    setEmail(value);
    // Validate Field and Update Errors
    setError(validateEmail(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = validateEmail(email);
    setError(newError);
    if (newError) {
      return;
    }

    try {
      const response = await api.post("/auth/forgot-password", { email });
      if (response.data.status === "success") {
        notifySuccess("Email sent successfully! Please check your inbox.");
        navigate("/login");
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
              onChange={handleInputChange}
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
