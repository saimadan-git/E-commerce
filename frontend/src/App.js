import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import ForgetPassword from "./pages/ForgetPassword";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import GoogleButton from "./components/GoogleButton/GoogleButton.js";

import ResetPassword from "./pages/ResetPassword/ResetPassword.js";
import { AuthProvider } from "./context/AuthContext.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import GuestRoute from "./components/GuestRoute.js";
import Products from "./pages/ProductsAdmin/Products.js";
import AdminRoute from "./components/AdminRoute.js";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <ToastContainer />
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />
              <Route path="shop" element={<Shop />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              <Route path="about" element={<About/>} />
              <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
              <Route path="reset-password/:id/:token" element={<ResetPassword />} />
              <Route path="google-button" element={<GoogleButton />} />
              <Route path="products-management" element={<AdminRoute><Products /></AdminRoute>} />
              <Route path="/product/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;