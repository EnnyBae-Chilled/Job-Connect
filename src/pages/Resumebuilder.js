import React, { useState } from 'react';
import './ResumeBuilder.css';
import { Link } from 'react-router-dom';

function ResumeBuilder() {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    linkedin: '',
    address: '',
  });

  const [education, setEducation] = useState({
    school: '',
    degree: '',
    major: '',
    graduationDate: '',
    gpa: '', // Added GPA
  });

  const [skills, setSkills] = useState(['']);
  const [experiences, setExperiences] = useState([
    {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  const handleContactChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleEducationChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [e.target.name]: e.target.value,
    };
    setExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const generateResume = () => {
    // Create a new window for the resume
    const resumeWindow = window.open('', '_blank');
    
    // HTML template with paper-like styling
    resumeWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${contact.firstName} ${contact.lastName}'s Resume</title>
        <style>
          body {
            font-family: 'Times New Roman', serif;
            background-color: #f9f9f9;
            display: flex;
            justify-content: center;
            padding: 40px 0;
          }
          .resume-paper {
            width: 8.5in;
            min-height: 11in;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 1in;
            position: relative;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          .header h1 {
            font-size: 28pt;
            margin: 0;
            color: #333;
          }
          .contact-info {
            font-size: 11pt;
            margin-top: 10px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section h2 {
            font-size: 14pt;
            border-bottom: 1px solid #333;
            padding-bottom: 3px;
            margin-bottom: 10px;
            color: #333;
          }
          .experience-item, .education-item {
            margin-bottom: 15px;
          }
          .job-title, .degree {
            font-weight: bold;
            font-size: 12pt;
          }
          .company, .school {
            font-style: italic;
          }
          .date-range {
            float: right;
            color: #555;
          }
          .description {
            margin-top: 5px;
            font-size: 11pt;
            line-height: 1.4;
          }
          .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .skill {
            background: #f0f0f0;
            padding: 3px 10px;
            border-radius: 3px;
            font-size: 11pt;
          }
        </style>
      </head>
      <body>
        <div class="resume-paper">
          <!-- Header Section -->
          <div class="header">
            <h1>${contact.firstName} ${contact.lastName}</h1>
            <div class="contact-info">
              ${contact.phone} | ${contact.email} | ${contact.linkedin}<br>
              ${contact.address}
            </div>
          </div>
          
          <!-- Education Section -->
          <div class="section">
            <h2>EDUCATION</h2>
            <div class="education-item">
              <div class="degree">${education.degree} in ${education.major}</div>
              <div class="school">${education.school}</div>
              <div class="date-range">${education.graduationDate}</div>
              <div>GPA: ${education.gpa}</div>
            </div>
          </div>
          
          <!-- Experience Section -->
          <div class="section">
            <h2>EXPERIENCE</h2>
            ${experiences.map(exp => `
              <div class="experience-item">
                <div>
                  <span class="job-title">${exp.jobTitle}</span>
                  <span class="date-range">${exp.startDate} - ${exp.endDate}</span>
                </div>
                <div class="company">${exp.company}</div>
                <div class="description">${exp.description}</div>
              </div>
            `).join('')}
          </div>
          
          <!-- Skills Section -->
          <div class="section">
            <h2>SKILLS</h2>
            <div class="skills-list">
              ${skills.filter(skill => skill.trim() !== '').map(skill => `
                <div class="skill">${skill}</div>
              `).join('')}
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
    resumeWindow.document.close();
    resumeWindow.focus();
    resumeWindow.print();
  };


  return (
    <div>
      <h1>Create Your Resume</h1>
      <div className="resume-builder-container">
        <div className="resume-form">
          <h2>Contact Information</h2>
          <div className="input-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={contact.firstName} onChange={handleContactChange} />
            <label>Last Name:</label>
            <input type="text" name="lastName" value={contact.lastName} onChange={handleContactChange} />
            <label>Phone Number:</label>
            <input type="text" name="phone" value={contact.phone} onChange={handleContactChange} />
          </div>
          <div className="input-group">
            <label>Website (LinkedIn, Personal website, etc):</label>
            <input type="text" name="linkedin" value={contact.linkedin} onChange={handleContactChange} />
            <button type="button" onClick={() => console.log('Add another')}>
              Add another
            </button>
          </div>

          <h2>Education</h2>
          <div className="input-group">
            <label>School:</label>
            <input type="text" name="school" value={education.school} onChange={handleEducationChange} />
            <label>Graduation Date:</label>
            <input type="date" name="graduationDate" value={education.graduationDate} onChange={handleEducationChange} />
          </div>
          <div className="input-group">
            <label>Degree:</label>
            <input type="text" name="degree" value={education.degree} onChange={handleEducationChange} />
            <label>Major:</label>
            <input type="text" name="major" value={education.major} onChange={handleEducationChange} />
            <label>GPA:</label>
            <input type="text" name="gpa" value={education.gpa} onChange={handleEducationChange} />
          </div>

          <h2>Skills</h2>
          {skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => handleSkillsChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddSkill}>
            Add another
          </button>

          <h2>Experiences</h2>
        {experiences.map((exp, index) => (
          <div key={index}>
            <input type="text" name="jobTitle" placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleExperienceChange(index, e)} />
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} />
            <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} />
            <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} />
            <textarea name="description" placeholder="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, e)} />
          </div>
        ))}
        <button type="button" onClick={handleAddExperience}>
          Add another
        </button>
        <button type="button" onClick={generateResume} className="generate-button">
          Generate Resume
        </button>
        <button className="cont">
            <Link to="/jobconnect" className="button-link">Continue</Link>
        </button>

      </div>

      
    </div>
  </div>
  );
}

export default ResumeBuilder;