import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import googleLogo from '../assets/Vector.svg';

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log("Signing in with Google");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Implement account creation logic here (e.g., API call)
    // After successful account creation, navigate to the location page
    navigate("/location");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    //Implement sign in logic here.
    console.log("Signing In");
    //After successful sign in, you can navigate to another page if needed.
    navigate("/jobconnect");
  }

  const handleSubmit = (e) => {
    if (isSignIn) {
      handleSignIn(e);
    } else {
      handleCreateAccount(e);
    }
  }

  return (
    <div className="auth-page-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-page-form"
      >
        <h2 className="auth-page-title">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>
        <form className="auth-page-form-inputs" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="auth-page-input-container">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="auth-page-input"
              />
              <label htmlFor="fullName" className="auth-page-placeholder">Full Name</label>
            </div>
          )}
          <div className="auth-page-input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-page-input"
            />
            <label htmlFor="email" className="auth-page-placeholder">Email</label>
          </div>
          <div className="auth-page-input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-page-input"
            />
            <label htmlFor="password" className="auth-page-placeholder">Password</label>
            <p className="pass">Passwords must be between 8-12 characters</p>
          </div>
          <button type="submit" className="auth-page-button">
            {isSignIn ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-page-toggle">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="auth-page-toggle-button"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
        <p className="or">OR</p>
        <button className="google-button" onClick={handleGoogleSignIn}>
          <img src={googleLogo} alt="Google" className="google-icon" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
}