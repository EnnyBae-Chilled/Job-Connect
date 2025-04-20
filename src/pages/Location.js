// LocationPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Location.css";

export default function LocationPage() {
  const [isRemoteWork, setIsRemoteWork] = useState(false);

  const handleToggle = () => {
    setIsRemoteWork(!isRemoteWork);
  };

  return (
    <div className="container1">
      <nav className="navbar">
        <h1 className="logo">JOBCONNECT</h1>
        <div className="nav-links">
          <Link to="/landing">Home</Link>
          <a href="/upload-resume">Upload Resume</a>
          <a href="/auth">Sign In</a>
        </div>
      </nav>

      <div className="content1">
        <div className="text-section1">
          <h1>Let's Start with the basics</h1>
          <h2>Where are you located?</h2>

          <div className="location-input-container">
            <input
              type="text"
              placeholder="City, State, Country"
              className="location-input-city-state-input"
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="location-input-zip-code-input"
            />
          </div>
          <div className="remote-toggle">
            <label className="fancy-switch">
              {" "}
              {/* Use the new class name */}
              <input
                type="checkbox"
                checked={isRemoteWork}
                onChange={handleToggle}
              />
              <span className="fancy-slider">
                {/* <span className="lens"></span> */}
              </span>
            </label>
            <p>I'm interested in remote work</p>
          </div>
          <button className="continue">
            <Link to="/worktype" className="button-link">
              Continue
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
