import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import api from "../../utils/api.js";
import LoginWithGoogle from "../../components/GoogleButton/GoogleButton.js";
import AuthContext from "../../context/AuthContext.js";

const Register = () => {
  const {login} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [visibility, setVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validate Form Fields
  const validateField = (name, value) => {
    let error = "";

    if (name === "name") {
      if (!value) {
        error = "Name must be required.";
      } else if (value.length > 50) {
        error = "Name must be under 50 characters.";
      }
    } else if (name === "email") {
      if (!value) {
        error = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email address.";
      }
    } else if (name === "mobileNumber") {
      if (!value) {
        error = "Mobile number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Mobile number must be 10 digits.";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/.test(value)) {
        error = "Password must be 6-30 characters, include letters, numbers, and special characters.";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        error = "Confirm Password is required.";
      } else if (value !== formData.password) {
        error = "Passwords do not match.";
      }
    }

    return error;
  };

  // Handle Input Change and Validate in Real-Time
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update Form Data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate Field and Update Errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate All Fields Before Submitting
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      mobileNumber: validateField("mobileNumber", formData.mobileNumber),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };

    setErrors(newErrors);

    // If Any Errors Exist, Don't Submit
    if (Object.values(newErrors).some((error) => error)) return;

    // API Call
    try {
      const response = await api.post('/auth/register', formData);
      if (response.data.status === "success") {
        let userData = response.data.data;
        login(userData, "");
        notifySuccess(response.data.message);
        navigate("/login");
      } else {
        notifyError(response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      notifyError(errorMsg);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="login-page">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Join the Pickle Party</h2>
          <p>Your Taste Buds are Invited!</p>

          {/* Name */}
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="name">Name</label>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              placeholder=" "
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
            <label htmlFor="mobileNumber">Mobile Number</label>
            {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={visibility.password ? "text" : "password"}
                name="password"
                id="password"
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password">Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("password")}
              >
                {visibility.password ? "👁️" : "🙈"}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("confirmPassword")}
              >
                {visibility.confirmPassword ? "👁️" : "🙈"}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          {/* Buttons */}
          <div className="login-btn-container">
            <button type="button" onClick={handleReset} className="register-page-button reset-button">
              Reset
            </button>
            <button type="submit" className="register-page-button register-button">Register</button>
          </div>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className="or-text">or</p>
        <LoginWithGoogle />
      </div>
    </div>
  );
};

export default Register;
