import React from "react";
import axios from "axios"
import image5 from "../../assests/images/image5.jpg"

import { useState } from "react"; 
import "./Login.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigate function

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    // const provider = new GoogleAuthProvider();
    // try {
    //   await signInWithPopup(auth, provider);
    //   alert('Login with Google successful!');
    // } catch (err) {
    //   setError(err.message);
    // }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    let hasErrors = false;

    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
      hasErrors = true;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email.";
      hasErrors = true;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      hasErrors = true;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      hasErrors = true;
    }

    setErrors(newErrors);

    // If no errors, proceed (e.g., call API)
    if (!hasErrors) {
      try {
        const response = await axios.post("http://localhost:3000/login", formData, {
          validateStatus: (status) => {
            // Treat all status codes as valid (do not throw exceptions)
            return status >= 200 && status < 500;
          },
        });
        if (response.data.status === "success") {
          notifySuccess(response.data.message);
          navigate("/");
        } else {
          notifyError(response.data.message);
        }  
      } catch (err) {
        if (err.response) {
          notifyError(err.response.data.message); // Handle error from the backend
        } else {
          notifyError("Something went wrong!");
        }
      }
    }
  };


  return (
    <div className="login-page">
<<<<<<< HEAD
        {/* <img src={image5} /> */}
=======
        {/* <img src="https://t4.ftcdn.net/jpg/02/34/03/09/360_F_234030991_AFwQNyBq58UHYHoRFGNJxVAtFuX7DeJD.jpg" /> */}
>>>>>>> 328d162a9bed2db1e2d2ab963b007eba65e4d6cf
        {/* <img src="https://kandrafoods.com/wp-content/uploads/2021/06/Mango-Pickle-Product-Image-247x296.png" />
        <img src="https://static.vecteezy.com/system/resources/thumbnails/044/430/404/small_2x/mango-green-mango-illustration-vector.jpg" />
        {/* <img src="https://images.jdmagicbox.com/quickquotes/listicle/listicle_1685227340738_2rjfy_1040x500.jpg" className="pickle-image"/> */}
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              id="email" 
              name="email"
              placeholder=" " 
              value={formData.email}
              onChange={handleInputChange} 
            />
            <label htmlFor="email">Email</label>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <div className="password-wrapper">
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
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </div>
            {errors.password && (<p className="error-message">{errors.password}</p>)}
          </div>
          <div className="login-btn-container">
            <p className="login-footer">
              <Link to="/forget-password">Forget Password?</Link>
            </p>
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="or-text">or</p>
        <button onClick={handleGoogleSignIn} className="google-btn">
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

export default Login;