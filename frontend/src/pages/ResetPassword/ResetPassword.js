import React, { useState } from "react";
import api from "../../utils/api.js";
import "../../styles/AuthPages.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false); 
  const {id, token} = useParams();

  const [visibility, setVisibility] = useState({
    newPassword: false,
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

    if (name === "newPassword") {
      if (!value) {
        error = "Password is required.";
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,30}$/.test(value)) {
        error = "Password must be 6-30 characters, include letters, numbers, and special characters.";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        error = "Confirm Password is required.";
      } else if (value !== formData.newPassword) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate All Fields Before Submitting
    const newErrors = {
      newPassword: validateField("newPassword", formData.newPassword),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword),
    };

    setErrors(newErrors);

    // If Any Errors Exist, Don't Submit
    if (Object.values(newErrors).some((error) => error)) return;

    setLoading(true); // Set loading to true

    try {
      formData.id = id;
      formData.token = token;
      const response = await api.post(`/auth/reset-password/${id}/${token}`, formData);
      if (response.data.status === "success") {
        notifySuccess("Password reset successfully!");
        navigate("/login");
      } else {
        notifyError("Failed to reset password. Try again.");
      }
    } catch (err) {
      console.error(err.message);
      notifyError("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading to false
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={visibility.newPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                placeholder=" "
                value={formData.newPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
              <label htmlFor="newPassword">New Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("newPassword")}
              >
                {visibility.newPassword ? "🙉" : "🙈"}
              </span>
            </div>
            {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
          </div>

          <div className="form-group">
            <div className="password-wrapper">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={loading}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span
                className="password-toggle-icon"
                onClick={() => toggleVisibility("confirmPassword")}
              >
                {visibility.confirmPassword ? "🙉" : "🙈"}
              </span>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="button login-button" disabled={loading}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
