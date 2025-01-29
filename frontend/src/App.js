import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ForgetPassword from "./pages/ForgetPassword";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import GoogleButton from "./components/GoogleButton/GoogleButton.js";

import ResetPassword from "./pages/ResetPassword/ResetPassword.js";

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer />
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="shop" element={<Shop />} />
            <Route path="forget-password" element={<ForgetPassword />} />
            <Route path="about" element={<About/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="reset-password/:id/:token" element={<ResetPassword />} />
            <Route path="google-button" element={<GoogleButton />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
