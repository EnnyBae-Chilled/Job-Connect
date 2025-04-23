import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeUpload.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ResumeUpload() {
  const [noResume, setNoResume] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setNoResume(!noResume);
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      alert("Please sign in again.");
      return;
    }

    const user = JSON.parse(stored);
    if (!user._id) {
      alert("Invalid user data. Please sign in again.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("userId", user._id);

    try {
      const response = await axios.post(
        "http://18.117.165.46:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Resume uploaded:", response.data);
      // alert('Resume uploaded successfully!');
      setShowPopup(true);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload resume.");
    }
  };

  const handleContinue = () => {
    navigate("/jobconnect");
  };

  return (
    <div className="resume-upload-container">
      <div className="circle-container">
        <div className="content">
          <div className="vertical-text-container">
            <span className="topic">Upload Your Resume</span>
            <div className="file-upload">
              <input
                type="file"
                id="file"
                className="hidden-file"
                onChange={handleFileChange}
              />
              <label htmlFor="file" className="choose-file">
                Choose file
              </label>
              {resumeFile && (
                <span className="file-name">{resumeFile.name}</span>
              )}
            </div>

            <button className="upload-button" onClick={handleUpload}>
              Upload
            </button>
            <div className="toggle-container">
              <label className="fancy-toggle">
                <input
                  type="checkbox"
                  checked={noResume}
                  onChange={handleToggle}
                />
                <span className="fancy-slider"></span>
              </label>
              <span className="toggle-message">I don't have a resume</span>
            </div>
            {noResume && (
              <button className="create-resume-button">
                <Link to="/resumebuilder">Create your perfect Resume</Link>
              </button>
            )}
            {!noResume && (
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Success!</h2>
            <p>Your resume has been uploaded successfully.</p>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
