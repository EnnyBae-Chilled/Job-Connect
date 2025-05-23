import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
import https from 'https';
function ProfilePage() {
  const [resumeData, setResumeData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  //   const history = useHistory(); // For back button functionality
  const handleContinue = () => {
    navigate("/jobconnect");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "https://18.117.165.46/api/auth/user-details",
          { userId },{
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          }
        );
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    } else {
      setLoading(false);
      setError("User not logged in or missing ID.");
    }
  }, [userId, setError]);
  useEffect(() => {
    const fetchResumeData = async () => {
      if (userDetails?.resume) {
        try {
          const response = await axios.post(
            "https://18.117.165.46/api/resume/extract",
            {
              resumePath: userDetails.resume,
            }, 
            {
              httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            }
          );
          setResumeData(response.data);
        } catch (err) {
          console.error("Error extracting resume data:", err);
          setError("Could not extract resume details.");
        }
      }
    };

    fetchResumeData();
  }, [userDetails, setError]);
  if (loading) return <p>Loading...</p>;
  if (!userDetails) return <p>User not found.</p>;

  return (
    <div className="profile-page-container">
      {/* Back button */}
      <button className="back-button" onClick={handleContinue}>
        &lt; Back
      </button>

      <h1>Your Profile</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {resumeData && (
        <div className="parsed-resume-info">
          <h3>Extracted Resume Info</h3>
          <p>
            <strong>Name:</strong> {resumeData.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {resumeData.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {resumeData.phone || "N/A"}
          </p>
          <p>
            <strong>Skills:</strong> {(resumeData.skills || []).join(", ")}
          </p>
        </div>
      )}

      <div className="resume-display">
        {/* HEADER */}
        <div className="header">
          <h2>{userDetails.username}</h2>
          <div className="contact-info">
            <a href={`mailto:${userDetails.email}`}>{userDetails.email}</a>
          </div>
        </div>

        {/* RESUME DOCUMENT */}
        {userDetails.resume && (
          <div className="resume-section">
            <h3>Resume</h3>
            {userDetails.resume.endsWith(".pdf") ? (
              <iframe
                src={`http://18.117.165.46:5000/${userDetails.resume}`}
                title="Resume"
                width="100%"
                height="500px"
                style={{ border: "none" }}
              />
            ) : (
              <p>Resume is not in a supported viewable format.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
