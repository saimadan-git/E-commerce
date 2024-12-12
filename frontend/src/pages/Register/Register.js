import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [showOtpPage, setShowOtpPage] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [generatedCustomerId, setGeneratedCustomerId] = useState("");

  const validateForm = () => {
    const newErrors = {};

    /*if (!formData.consumerId.match(/^\d{13}$/)) {
      newErrors.consumerId = "Consumer ID must be a 13-digit number.";
    }*/
    if (!formData.customerName || formData.customerName.length > 50) {
      newErrors.customerName = "Customer name must be under 50 characters.";
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
      //alert('Maheshwar is smarty')
      try {
        const response = await axios.post('http://localhost:3000/register', formData);
        const { customerId, customerName, email } = response.data;
  
        setGeneratedCustomerId(customerId);
        setFormData({ ...formData, customerName, email });
        setIsRegistered(true);
      } catch (err) {
        alert(`Registration failed: ${err.response?.data?.error || err.message}`);
      }
    }
  };
  

  const handleOtpVerification = () => {
    if (otp === "123456") {
      const randomCustomerId = Math.floor(1000000000000 + Math.random() * 9000000000000);
      setGeneratedCustomerId(randomCustomerId);
      setIsRegistered(true);
      setShowOtpPage(false);
    } else {
      alert("Invalid OTP. Try again.");
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
    setShowOtpPage(false);
    setIsRegistered(false);
  };

  if (isRegistered) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ color: "green" }}>Consumer Registration Successful!</h2>
        <p>Customer ID: {generatedCustomerId}</p>
        <p>Customer Name: {formData.customerName}</p>
        <p>Email: {formData.email}</p>
        <button onClick={handleReset}>Register Another User</button>
      </div>
    );
  }

  if (showOtpPage) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>OTP Verification</h2>
        <p>Please enter the OTP sent to your mobile number (use: 123456).</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={handleOtpVerification}>Verify OTP</button>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Join the Pickle Party</h2>
          <p>Your Taste Buds are Invited!</p>
          <div>
            <input            
              type="text"
              name="name"
              value={formData.name}
              placeholder="Name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            {errors.customerName && <p style={{ color: "red" }}>{errors.customerName}</p>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              required
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              placeholder="Mobile Number"
              required
            />
            {errors.mobileNumber && <p style={{ color: "red" }}>{errors.mobileNumber}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              required
            />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-button">Register</button>
            <button type="button" onClick={handleReset} className="login-button">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;