import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeUpload.css';
import { Link } from 'react-router-dom';



function ResumeUpload() {
  const [noResume, setNoResume] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setNoResume(!noResume);
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (resumeFile) {
      console.log('Resume uploaded:', resumeFile.name);
    } else {
      alert('Please select a resume file to upload.');
    }
  };

  const handleContinue = () => {
    navigate('/next-page'); // Replace '/next-page' with the actual route
  };

  return (
    <div className="resume-upload-container">
      <div className="circle-container">
        <div className="content">
          <div className="vertical-text-container">
            <span className="topic">Upload Your Resume</span>
            <div className="file-upload">
              <input type="file" id="file" className="hidden-file" onChange={handleFileChange} />
              <label htmlFor="file" className="choose-file">
                Choose file
              </label>
            </div>
            <button className="upload-button" onClick={handleUpload}>Upload</button>
            <div className="toggle-container">
              <label className="fancy-toggle">
                <input type="checkbox" checked={noResume} onChange={handleToggle} />
                <span className="fancy-slider"></span>
              </label>
              <span className="toggle-message">I don't have a resume</span>
            </div>
            {noResume && (
              <button className="create-resume-button">
                <Link to="/resumebuilder">Create your perfect Resume</Link>
              </button>
            )}
            {!noResume && ( // Continue button appears only when toggle is NOT clicked
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;