import React, { useState } from "react";
import axios from "axios";
import "../../styles/AuthPages.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";

const ResetPassword = () => {
  const [formData, setFormData] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { newPassword: "", confirmPassword: "" };
    let hasErrors = false;

    if (!formData.newPassword) {
      newErrors.newPassword = "New Password is required.";
      hasErrors = true;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
      hasErrors = true;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      try {
        const response = await axios.post("http://localhost:3000/reset-password", formData);
        if (response.data.success) {
          notifySuccess("Password reset successfully!");
        } else {
          notifyError("Failed to reset password. Try again.");
        }
      } catch (err) {
        console.error(err.message);
        notifyError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-page">
        <div className="auth-card">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder=" "
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="newPassword">New Password</label>
                    {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
                </div>

                <div className="form-group">
                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder=" "
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="button login-button">Reset Password</button>
            </form>
      </div>
    </div>
  );
};

export default ResetPassword;
