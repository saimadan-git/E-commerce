import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const isAdmin = user && user.role === "admin";

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/profile", label: "Profile", protected: true },
    { path: "/products-management", label: "Product Management", adminOnly: true },
    { path: "/cart", label: "Cart", protected: true },
    { path: "/login", label: "Login", guestOnly: true },
    { path: "/register", label: "Register", guestOnly: true },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Malini Foods Home">
        Malini Foods
      </Link>
      <ul className="nav-links">
        {navItems.map((item) => {
          if (item.protected && !user) return null;
          if (item.adminOnly && !isAdmin) return null;
          if (item.guestOnly && user) return null;

          return (
            <li key={item.path}>
              <Link to={item.path} className={location.pathname === item.path ? "active" : ""}>
                {item.label}
              </Link>
            </li>
          );
        })}
        {user && (
          <li>
            <Link onClick={logout} className="logout-link">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
