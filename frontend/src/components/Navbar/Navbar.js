import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = user && user.role === "admin";
  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Malini Foods Home">
        Malini Foods
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/about">About</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        
        {user && (
          <>
            <li><Link to="/profile">Profile</Link></li>
            {isAdmin && <li><Link to="/products-management">Product Management</Link></li>}
            <li><Link to="/cart">Cart</Link></li>
            <li><Link onClick={logout}>Logout</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
