import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../utils/api.js";
import LoginWithGoogle from "../../components/GoogleButton/GoogleButton.js";
import AuthContext from "../../context/AuthContext.js";
import MangoPickleImage from "../../assests/images/Mango-Pickle3.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Validate Form Fields
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      if (!value) {
        error = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email.";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters.";
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
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    setErrors(newErrors);

    // If Any Errors Exist, Don't Submit
    if (Object.values(newErrors).some((error) => error)) return;

    // API Call
    try {
      const response = await api.post("/auth/login", formData);
      if (response.data.status === "success") {
        let userData = response.data.data;
        let token = response.data.data.token;
        login(userData, token);
        notifySuccess(response.data.message);
        navigate("/");
      } else {
        notifyError(response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      notifyError(errorMsg);
    }
  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginCard}>
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password">Password</label>
              <span
                className={styles.passwordToggleIcon}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </div>
            {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div className={styles.loginBtnContainer}>
            <p className={styles.login}>
              <Link to="/forget-password">Forget Password?</Link>
            </p>
            <button type="submit" className={styles.loginButton}>Login</button>
          </div>
        </form>

        <p className={styles.loginFooter}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className={styles.orText}>or</p>
        <LoginWithGoogle />
      </div>
      <img src={MangoPickleImage} alt="Mango Pickle"  className={styles.pickleImage}/>
    </div>
  );
};

export default Login;
