import React from "react";
import "./LandingPage.css";
import ProfessionalImage from "../assets/job.png"
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      
      <nav className="navbar1">
        <h1 className="logo1">JOBCONNECT</h1>
        <div className="nav-links1">
          <Link to="/">Home</Link>
          <a href="/upload-resume">Upload Resume</a>
          <a href="/auth">Sign In</a>
        </div>
      </nav>

      <div className="content">
        <div className="text-section">
          <h1>Welcome to JobConnect</h1>
          <p>
            Get your personalized job recommendations
          </p>
          <button className="get-started">
            <Link to="/auth" className="button-link">Get Started</Link>
          </button>
        </div>
        <div className="image-section">
        {/* <img src={eclipsebackground}/> */}
          <img src= {ProfessionalImage} alt="Professional" className="profile-image" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;