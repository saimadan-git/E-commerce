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
import Home2 from "./pages/Home2/Home2.js";
import About from "./pages/About";

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
            <Route path="home2" element={<Home2 />} />
            <Route path="about" element={<About/>} />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
