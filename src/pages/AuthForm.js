import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import googleLogo from "../assets/Vector.svg";
import axios from "axios";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const form = {
    username: fullName,
    email,
    password,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const resetFields = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const validateForm = () => {
    if (!email || !password || (!isSignIn && !fullName)) {
      return "Please fill in all fields.";
    }
    if (password.length < 8 || password.length > 12) {
      return "Password must be between 8-12 characters.";
    }
    return "";
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(
        "https://18.117.165.46/api/auth/register",
        form,
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsSignIn(true);
    } catch (err) {
      let message = "Signup failed - server unavailable";
      if (err.code === "ECONNABORTED") {
        message = "Request timeout - server is not responding";
      } else if (err.message === "Network Error") {
        message = "Cannot connect to server - make sure it's running";
      } else if (err.response) {
        message =
          err.response.data?.message || `Server error: ${err.response.status}`;
      }

      setError(message);
      console.error("Signup error:", err);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://18.117.165.46/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsLoggedIn(true);
      navigate("/location");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed - check credentials";
      setError(message);
      console.error("Login error:", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    resetFields();
    setIsSignIn(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    if (isSignIn) {
      await handleSignIn();
    } else {
      await handleCreateAccount();
    }

    setIsSubmitting(false);
  };

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google");
    // Hook up Google OAuth here
  };

  return (
    <div className="auth-page-container">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-page-form"
      >
        <h2 className="auth-page-title">
          {isLoggedIn ? "Welcome Back!" : isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {isLoggedIn ? (
          <>
            <p className="auth-page-success">You're already signed in.</p>
            <button className="auth-page-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <form className="auth-page-form-inputs" onSubmit={handleSubmit}>
              {!isSignIn && (
                <div className="auth-page-input-container">
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="auth-page-input"
                    required
                  />
                  <label htmlFor="fullName" className="auth-page-placeholder">
                    Full Name
                  </label>
                </div>
              )}

              <div className="auth-page-input-container">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-page-input"
                  required
                />
                <label htmlFor="email" className="auth-page-placeholder">
                  Email
                </label>
              </div>

              <div className="auth-page-input-container">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-page-input"
                  required
                />
                <label htmlFor="password" className="auth-page-placeholder">
                  Password
                </label>
                <p className="pass">
                  Passwords must be between 8–12 characters
                </p>
              </div>

              {error && <p className="auth-page-error">{error}</p>}

              <button
                type="submit"
                className="auth-page-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isSignIn
                    ? "Signing In..."
                    : "Creating Account..."
                  : isSignIn
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            <p className="auth-page-toggle">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsSignIn(!isSignIn);
                  resetFields();
                }}
                className="auth-page-toggle-button"
              >
                {isSignIn ? "Sign Up" : "Sign In"}
              </button>
            </p>

            {/* <button className="google-button" onClick={handleGoogleSignIn}>
              <img src={googleLogo} alt="Google" className="google-icon" />
              Sign in with Google
            </button> */}
          </>
        )}
      </motion.div>
    </div>
  );
}
