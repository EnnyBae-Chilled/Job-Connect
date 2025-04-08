import { useState } from "react";
import "./Type.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Type() {
  const [jobTitles, setJobTitles] = useState([""]);
  const [jobLevel, setJobLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJobTitleChange = (index, value) => {
    const updatedTitles = [...jobTitles];
    updatedTitles[index] = value;
    setJobTitles(updatedTitles);
  };

  const handleAddJobTitle = () => {
    if (jobTitles.length < 10) {
      setJobTitles([...jobTitles, ""]);
    }
  };

  const handleDeleteJobTitle = (index) => {
    const updatedTitles = jobTitles.filter((_, i) => i !== index);
    setJobTitles(updatedTitles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Filter out empty job titles
      const filteredJobTitles = jobTitles.filter(title => title.trim() !== "");
      
      if (filteredJobTitles.length === 0) {
        throw new Error("Please enter at least one job title");
      }

      if (!jobLevel) {
        throw new Error("Please select a job level");
      }

      // Get the user ID from your auth system (adjust as needed)
      const userId = localStorage.getItem("userId"); // Or from context/state

      // Prepare the data to send
      const preferences = {
        userId,
        jobTitles: filteredJobTitles,
        jobLevel,
      };

      // Send to your API endpoint
      const response = await axios.post("/api/users/preferences", preferences);
      
      // On success, navigate to next page
      navigate("/upload-resume");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
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

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
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
                  required={index === 0}
                />
                <button 
                  type="button"
                  className="edit-btn" 
                  onClick={() => handleJobTitleChange(index, "")}
                >
                  ✏️
                </button>
                {jobTitles.length > 1 && (
                  <button
                    type="button"
                    className="delete-btn" 
                    onClick={() => handleDeleteJobTitle(index)}
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}

            {jobTitles.length < 10 && (
              <button 
                type="button"
                className="add-button" 
                onClick={handleAddJobTitle}
              >
                + Add another
              </button>
            )}
          </div>

          {/* Job Level Selection */}
          <div className="section">
            <p className="question">What job level are you interested in?</p>
            <select 
              className="input-box" 
              value={jobLevel} 
              onChange={(e) => setJobLevel(e.target.value)}
              required
            >
              <option value="">Select job level</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Early Career">Early Career</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          {/* Continue Button */}
          <div className="button-container">
            <button 
              type="submit" 
              className="continue-button"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}