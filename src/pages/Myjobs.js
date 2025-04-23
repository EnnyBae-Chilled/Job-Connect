import React, { useState, useEffect } from "react";
import "./Myjobs.css";
import { useNavigate } from "react-router-dom";
// const interviewTipsData = {
//   'Certified Nursing Assistant -CNA': [
//     "Research common CNA interview questions, such as your experience with patient care and handling emergencies.",
//     "Be prepared to discuss your understanding of patient safety and hygiene protocols.",
//     "Highlight your empathy, communication, and teamwork skills.",
//     "Consider bringing examples of your patient care experiences.",
//     "Dress professionally and be punctual."
//   ],
//   'RN Registered Nurse': [
//     "Review the specific responsibilities of the RN role you've applied for.",
//     "Prepare answers related to your clinical skills, medication administration, and electronic health records.",
//     "Emphasize your critical thinking, problem-solving, and patient assessment abilities.",
//     "Be ready to discuss your experience with different patient populations.",
//     "Show your commitment to continuous learning and professional development."
//   ],
//   'Cardiac Unit RNs, Registered Nurses': [
//     "Focus on your experience in cardiac care, including monitoring equipment and emergency procedures.",
//     "Be prepared to discuss your knowledge of cardiac medications and treatments.",
//     "Highlight your ability to work under pressure and respond effectively in critical situations.",
//     "Emphasize your communication skills with patients and their families in a sensitive environment.",
//     "Review relevant certifications like ACLS."
//   ],
//   'Supervisor - Sterile Processing': [
//     "Demonstrate your leadership skills and experience in managing a sterile processing department.",
//     "Be ready to discuss your knowledge of sterilization techniques, quality control, and regulatory compliance.",
//     "Highlight your ability to train and supervise staff effectively.",
//     "Emphasize your problem-solving and organizational skills.",
//     "Show your understanding of infection prevention and control."
//   ],
//   'Software Engineer': [
//     "Review the job description and highlight your relevant technical skills (e.g., specific programming languages, frameworks).",
//     "Prepare to discuss your experience with software development methodologies (e.g., Agile, Scrum).",
//     "Be ready to explain your approach to problem-solving and debugging.",
//     "Showcase any personal projects or contributions to open-source projects.",
//     "Be prepared for technical questions and potentially coding challenges."
//   ],
// };

const MyJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [tips, setTips] = useState({});
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate("/jobconnect");
  };
  useEffect(() => {
    const storedAppliedJobs = localStorage.getItem("appliedJobs");
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);
  const handleGetTips = async (jobTitle) => {
    if (tips[jobTitle]) return;

    try {
      const response = await fetch("https://18.117.165.46/get-interview-tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle }),
      });

      const data = await response.json();
      if (data.tips) {
        setTips({ ...tips, [jobTitle]: data.tips });
      } else {
        setTips({
          ...tips,
          [jobTitle]: ["Could not fetch interview tips at this time."],
        });
      }
    } catch (error) {
      console.error("Error fetching tips:", error);
      setTips({
        ...tips,
        [jobTitle]: ["Could not fetch interview tips at this time."],
      });
    }
  };

  return (
    <div className="my-jobs-page">
      <button className="back-button" onClick={handleContinue}>
        &lt; Back
      </button>
      <h2>My Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>No jobs applied to yet.</p>
      ) : (
        appliedJobs.map((job) => (
          <div key={job.id} className="applied-job-card">
            <h3>{job.title}</h3>
            <p className="company">{job.company?.display_name}</p>
            <p className="location">{job.location?.display_name}</p>
            <div className="job-meta">
              {job.salary_min !== null && job.salary_max !== null ? (
                <span>
                  ${job.salary_min} - ${job.salary_max}
                </span>
              ) : job.salary_min !== null ? (
                <span>${job.salary_min}+</span>
              ) : job.salary_max !== null ? (
                <span>Up to ${job.salary_max}</span>
              ) : (
                <span>Salary not specified</span>
              )}
              <span>{job.contract_type}</span>
            </div>
            <div className="job-actions">
              <a
                href={job.redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="view-application-button"
              >
                View Application
              </a>
              <button
                className="get-tips-button"
                onClick={() => handleGetTips(job.title)}
              >
                Get Interview Tips
              </button>
            </div>
            {tips[job.title] && (
              <div className="interview-tips">
                <h4>Interview Tips:</h4>
                <ul>
                  {tips[job.title].map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyJobsPage;
