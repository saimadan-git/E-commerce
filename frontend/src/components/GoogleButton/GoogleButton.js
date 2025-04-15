import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./GoogleButton.css";
// import { useNavigate } from "react-router-dom";

const LoginWithGoogle = () => {
  // const navigate = useNavigate();
  const handleLoginWithGoogle = () => {
    // Redirect the user to the backend's Google OAuth route
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google`;
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <button onClick={handleLoginWithGoogle} className="google-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
          alt="Google Logo"
          className="google-icon"
        />
        Continue with Google
      </button>
    </GoogleOAuthProvider>
  );
};

export default LoginWithGoogle;
