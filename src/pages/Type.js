import { useState } from "react";
import "./Type.css"; // Import the CSS file
import { Link } from "react-router-dom";

export default function Type() {
  const [jobTitles, setJobTitles] = useState([""]);
  const [jobLevel, setJobLevel] = useState("");

  // Function to update job title
  const handleJobTitleChange = (index, value) => {
    const updatedTitles = [...jobTitles];
    updatedTitles[index] = value;
    setJobTitles(updatedTitles);
  };

  // Function to add a new job title input
  const handleAddJobTitle = () => {
    if (jobTitles.length < 10) {
      setJobTitles([...jobTitles, ""]);
    }
  };

  // Function to delete a job title input
  const handleDeleteJobTitle = (index) => {
    const updatedTitles = jobTitles.filter((_, i) => i !== index);
    setJobTitles(updatedTitles);
  };

  return (
    <div className="container2">
      <nav className="navbar">
        <h1 className="logo">JOBCONNECT</h1>
        <div className="nav-links">
          <Link to="/landing">Home</Link>
          <a href="#">Upload Resume</a>
          <a href="#">Sign In</a>
        </div>
      </nav>
      <div className="content2">
        <h2 className="title">Let's Start with the basics</h2>

        {/* Job Title Inputs */}
        <div className="section">
          <p className="question">What job are you looking for?</p>
          <p className="subtext">Add up to 10 job titles</p>

          {jobTitles.map((title, index) => (
            <div key={index} className="job-title-container">
              <input
                type="text"
                className="input-box"
                value={title}
                onChange={(e) => handleJobTitleChange(index, e.target.value)}
                placeholder="Job Title"
              />
              <button className="edit-btn" onClick={() => handleJobTitleChange(index, "")}>✏️</button>
              <button className="delete-btn" onClick={() => handleDeleteJobTitle(index)}>🗑️</button>
            </div>
          ))}

          {jobTitles.length < 10 && (
            <button className="add-button" onClick={handleAddJobTitle}>
              + Add another
            </button>
          )}
        </div>

        {/* Job Level Selection */}
        <div className="section">
          <p className="question">What job level are you interested in?</p>
          <select className="input-box" value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
            <option value="">Select job level</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Early Career">Early Career</option>
          </select>
        </div>

        {/* Continue Button */}
        <div className="button-container">
          <button className="continue-button">
            <Link to="/upload-resume">Continue</Link>
          </button>
        </div>
      </div>
    </div>
  );
}