import React, { useState, useEffect } from 'react';
import './JobConnect.css';
import { Link } from 'react-router-dom';
import { FaHome, FaSearchDollar, FaUser, FaHeart, FaComment, FaBriefcase } from 'react-icons/fa';

const JobConnect = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userQualifications, setUserQualifications] = useState({
    teachingCert: false,
    specialEdCert: false,
    clinicExperience: false
  });

  // Fetch jobs from API (example using Adzuna)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=55d71e86&app_key=f25039c3ae90734556314387fed4c69c`
        );
        const data = await response.json();
        setJobs(data.results);
        setSelectedJob(data.results[0]); // Select first job by default
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [searchTerm]);

  return (
    <div className="job-connect-container">
      <nav className="navbar">
        <h1 className="logo">JOBCONNECT</h1>
        <div className="nav-right">
          <div className="user-nav">
            <Link to="/profile" className="user-nav-item">
              <FaUser className="user-nav-icon" />
              <span>Profile</span>
            </Link>
            <Link to="/favorites" className="user-nav-item">
              <FaHeart className="user-nav-icon" />
              <span>My Favorites</span>
            </Link>
            <Link to="/chat" className="user-nav-item">
              <FaComment className="user-nav-icon" />
              <span>Chat</span>
            </Link>
            <Link to="/myjobs" className="user-nav-item">
              <FaBriefcase className="user-nav-icon" />
              <span>My Job</span>
            </Link>
          </div>
          {/* <div className="user-welcome">
            <span>Welcome, Eniola</span>
          </div> */}
        </div>
      </nav>


      {/* Search Header */}
      <div className="search-header">
        <input 
          type="text" 
          placeholder="Job title, Keywords, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome, Eniola</h1>
        <p>Jobs for you</p>
      </div>

      <div className="job-content">
        {/* Job Listings Sidebar */}
        <div className="job-listings">
          {jobs.map(job => (
            <div 
              key={job.id} 
              className={`job-card ${selectedJob?.id === job.id ? 'active' : ''}`}
              onClick={() => setSelectedJob(job)}
            >
              <h3>{job.title}</h3>
              <p className="company">{job.company.display_name}</p>
              <p className="location">{job.location.display_name}</p>
              <div className="job-meta">
                <span>${job.salary_min} - ${job.salary_max} an hour</span>
                <span>{job.contract_type}</span>
              </div>
              <button className="easy-apply">Easily apply</button>
              <p className="post-date">Active 3 days ago</p>
            </div>
          ))}
        </div>

        {/* Selected Job Details */}
        {selectedJob && (
          <div className="job-details">
            <h2>{selectedJob.title}</h2>
            <p className="company-location">
              {selectedJob.company.display_name} | {selectedJob.location.display_name}
            </p>

            <div className="job-description">
              {selectedJob.description}
            </div>

            {/* Profile Insights */}
            <div className="profile-insights">
              <h3>Profile Insights</h3>
              <p>Here's how the job qualifications align with your profile (✔)</p>
              
              <div className="qualification-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={userQualifications.teachingCert}
                    onChange={() => setUserQualifications({...userQualifications, teachingCert: !userQualifications.teachingCert})}
                  />
                  Teaching Certification (Required)
                </label>
              </div>

              <div className="qualification-item">
                <label>
                  <input 
                    type="checkbox" 
                    checked={userQualifications.specialEdCert}
                    onChange={() => setUserQualifications({...userQualifications, specialEdCert: !userQualifications.specialEdCert})}
                  />
                  Special Education Certification (Required)
                </label>
              </div>

              <div className="qualification-question">
                <p>Do you have experience in Correction facility medical clinic?</p>
                <div className="response-options">
                  <button 
                    className={userQualifications.clinicExperience ? 'active' : ''}
                    onClick={() => setUserQualifications({...userQualifications, clinicExperience: true})}
                  >
                    Yes
                  </button>
                  <button 
                    className={!userQualifications.clinicExperience ? 'active' : ''}
                    onClick={() => setUserQualifications({...userQualifications, clinicExperience: false})}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <button className="apply-now">Apply Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobConnect;