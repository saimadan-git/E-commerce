import React from "react";
import axios from "axios"
import { useState } from "react"; 
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

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
    try {
      const response = await axios.post("http://localhost:3000/login", formData);
      alert("Successful")
      setMessage(`Welcome, ${response.data.user.customerName}!`);
    } catch (err) {
      alert("UnSuccessful")
      setMessage(err.response?.data?.message || "Login failed.");
    }
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
      console.log("Form submitted:", formData);
      // Perform your login logic here
    }
  };


  return (
    <div className="login-page">
        {/* <img src="https://t4.ftcdn.net/jpg/02/34/03/09/360_F_234030991_AFwQNyBq58UHYHoRFGNJxVAtFuX7DeJD.jpg" /> */}
        {/* <img src="https://kandrafoods.com/wp-content/uploads/2021/06/Mango-Pickle-Product-Image-247x296.png" />
        <img src="https://static.vecteezy.com/system/resources/thumbnails/044/430/404/small_2x/mango-green-mango-illustration-vector.jpg" />
        {/* <img src="https://images.jdmagicbox.com/quickquotes/listicle/listicle_1685227340738_2rjfy_1040x500.jpg" className="pickle-image"/> */}
      <div className="login-card">
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div class="form-group">
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
          <div class="form-group" style={{ position: "relative" }}>
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
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </span>
            </div>
            {errors.password && (<p className="error-message">{errors.password}</p>)}
          </div>
          <div class="login-btn-container">
            <p class="login-footer">
              <a href="/forget-password">Forget Password?</a>
            </p>
            <button type="submit" class="login-button">Login</button>
          </div>
        </form>

        <p className="login-footer">
          Don't have an account? <a href="/register">Register</a>
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