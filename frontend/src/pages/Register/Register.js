import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import api from "../../utils/api.js";
import LoginWithGoogle from "../../components/GoogleButton/GoogleButton.js";
import AuthContext from "../../context/AuthContext.js";
import styles from "./Register.module.css";
import MangoPickleImage from "../../assests/images/Mango-Pickle3.png";

const Register = () => {
  const { login } = useContext(AuthContext);
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
        let token = response.data.data.token;
        login(userData, token);
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
    <div className={styles.registerPage}>
      <img src={MangoPickleImage} alt="Mango Pickle"  className={styles.pickleImage}/>
      <div className={styles.registerCard}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2>Join the Pickle Party</h2>
            <p className={styles.subHeading}>Your Taste Buds are Invited!</p>
          {/* Name */}
          <div className={styles.formGroup}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" "
              value={formData.name}
              onChange={handleInputChange}
            />
            <label htmlFor="name">Name</label>
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>
          <div className={styles.formRow}>


            {/* Email */}
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email">Email</label>
              {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
            </div>

            {/* Mobile Number */}
            <div className={styles.formGroup}>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                placeholder=" "
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
              <label htmlFor="mobileNumber">Mobile Number</label>
              {errors.mobileNumber && <p className={styles.errorMessage}>{errors.mobileNumber}</p>}
            </div>
          </div>

          <div className={styles.formRow}>

            {/* Password */}
            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
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
                  className={styles.passwordToggleIcon}
                  onClick={() => toggleVisibility("password")}
                >
                  {visibility.password ? "👁️" : "🙈"}
                </span>
              </div>
              {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
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
                  className={styles.passwordToggleIcon}
                  onClick={() => toggleVisibility("confirmPassword")}
                >
                  {visibility.confirmPassword ? "👁️" : "🙈"}
                </span>
              </div>
              {errors.confirmPassword && <p className={styles.errorMessage}>{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className={styles.loginBtnContainer}>
            <button
              type="button"
              onClick={handleReset}
              className={`${styles.registerPageButton} ${styles.resetButton}`}
            >
              Reset
            </button>
            <button
              type="submit"
              className={`${styles.registerPageButton} ${styles.registerButton}`}
            >
              Register
            </button>
          </div>
        </form>

        <p className={styles.registerFooter}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {/* <p className={styles.orText}>or</p> */}
        <LoginWithGoogle />
      </div>
    </div>
  );
};

export default Register;
