import React, { useState } from "react";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    //consumerId: "",
    title: "",
    customerName: "",
    email: "",
    countryCode: "",
    mobileNumber: "",
    userId: "",
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
      //consumerId: "",
      title: "",
      customerName: "",
      email: "",
      countryCode: "+1",
      mobileNumber: "",
      userId: "",
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
    <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
       {/* <!--<h2>Consumer Registration</h2>
     <div>
        <label>Consumer ID:</label>
        <input
          type="text"
          value={formData.consumerId}
          onChange={(e) => setFormData({ ...formData, consumerId: e.target.value })}
        />
        {errors.consumerId && <p style={{ color: "red" }}>{errors.consumerId}</p>}
      </div>--> */}
      <div>
        <label>Title:</label>
        <select
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        >
          <option value="">Select</option>
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
        </select>
      </div>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
        />
        {errors.customerName && <p style={{ color: "red" }}>{errors.customerName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>Mobile Number:</label>
        <select
          value={formData.countryCode}
          onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
        >
          <option value="+1">+1</option>
          <option value="+91">+91</option>
          <option value="+44">+44</option>
        </select>
        <input
          type="text"
          value={formData.mobileNumber}
          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
        />
        {errors.mobileNumber && <p style={{ color: "red" }}>{errors.mobileNumber}</p>}
      </div>
      <div>
        <label>User ID:</label>
        <input
          type="text"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
        {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
      </div>
      <div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default Register;