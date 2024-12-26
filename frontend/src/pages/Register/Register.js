import React, { useState } from "react";

import { Link } from 'react-router-dom';
import axios from "axios";
import "./Register.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";

const Register = () => {
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

  const toggleVisibility = (field) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name must be required.";
    }
    if (formData.name.length > 50) {
      newErrors.name = "Name must be under 50 characters.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.mobileNumber.match(/^\d{10}$/)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    }
    if (
      !formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/)
    ) {
      newErrors.password =
        "Password must be 6-30 characters, include letters, numbers, and special characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // notifyError("ss");
        const response = await axios.post('http://localhost:3000/register', formData);
        // let resources = {};
        // const { customerId, customerName, email } = response.data;
        // notifySuccess("Registration Successful!");
        if (response.data.status === "success") {
          notifySuccess(response.data.message);
          handleReset();
        } else {
          notifyError(response.data.message);
        }  
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  

  // const handleOtpVerification = () => {
  //   if (otp === "123456") {
  //     const randomCustomerId = Math.floor(1000000000000 + Math.random() * 9000000000000);
  //     setGeneratedCustomerId(randomCustomerId);
  //     setIsRegistered(true);
  //     setShowOtpPage(false);
  //   } else {
  //     alert("Invalid OTP. Try again.");
  //   }
  // };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    // setShowOtpPage(false);
    // setIsRegistered(false);
  };

  // if (isRegistered) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "20px" }}>
  //       <h2 style={{ color: "green" }}>Consumer Registration Successful!</h2>
  //       <p>Customer ID: {generatedCustomerId}</p>
  //       <p>Customer Name: {formData.customerName}</p>
  //       <p>Email: {formData.email}</p>
  //       <button onClick={handleReset}>Register Another User</button>
  //     </div>
  //   );
  // }

  // if (showOtpPage) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "20px" }}>
  //       <h2>OTP Verification</h2>
  //       <p>Please enter the OTP sent to your mobile number (use: 123456).</p>
  //       <input
  //         type="text"
  //         placeholder="Enter OTP"
  //         value={otp}
  //         onChange={(e) => setOtp(e.target.value)}
  //       />
  //       <button onClick={handleOtpVerification}>Verify OTP</button>
  //     </div>
  //   );
  // }

  return (
    <div className="login-page">
      <div className="register-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Join the Pickle Party</h2>
          <p>Your Taste Buds are Invited!</p>
          <div className="form-group">
            <input            
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              // required
            />
            <label htmlFor="name">Name</label>
            {errors.name && (<p className="error-message">{errors.name}</p>)}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder=" "
              // required
            />
            <label htmlFor="email">Email</label>
            {errors.email && (<p className="error-message">{errors.email}</p>)}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="mobileNumber"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              placeholder=" "
              // required
            />
            <label htmlFor="mobileNumber">Mobile Number</label>
            {errors.mobileNumber && (<p className="error-message">{errors.mobileNumber}</p>)}
          </div>
          <div className="form-group"> 
            <div className="password-wrapper">
              <input
                type={visibility.password ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder=" "
                // required
              />
              <label htmlFor="password">Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("password")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {visibility.password ? "🐵" : "🙈"}
              </span>
            </div>
            {errors.password && (<p className="error-message">{errors.password}</p>)}
          </div>
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder=" "
                // required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("confirmPassword")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {visibility.confirmPassword ? "🙉" : "🙈"}
              </span>
            </div>
            {errors.confirmPassword && (<p className="error-message">{errors.confirmPassword}</p>)}
          </div>
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
        <button className="google-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
            alt="Google Logo"
            className="google-icon"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;