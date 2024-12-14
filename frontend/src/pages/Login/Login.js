import React from "react";
import "./Login.css";

const Login = () => {
  const handleGoogleSignIn = async () => {
    // const provider = new GoogleAuthProvider();
    // try {
    //   await signInWithPopup(auth, provider);
    //   alert('Login with Google successful!');
    // } catch (err) {
    //   setError(err.message);
    // }
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
        
        <form className="login-form">
          <div class="form-group">
            <input type="text" id="email" placeholder=" " required />
            <label for="email">Email</label>
          </div>
          <div class="form-group">
            <input type="password" id="password" placeholder=" " required />
            <label for="password">Password</label>
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