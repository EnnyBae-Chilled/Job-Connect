import React, { useContext } from 'react';
import './ProfilePage.css'; // Create a CSS file for styling


 function ProfilePage() {
   const { resumeData } = useContext(ResumeContext);

   return (
     <div className="profile-page-container">
       <h1>Your Profile</h1>
       <div className="resume-display">
         {/* Header Section */}
         <div className="header">
           <h1>{resumeData.contact.firstName} {resumeData.contact.lastName}</h1>
           <div className="contact-info">
             {resumeData.contact.phone} | <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a> |
             {resumeData.contact.linkedin && <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>} |
             {resumeData.contact.github && <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
             {resumeData.contact.address && `, ${resumeData.contact.address}`}
             {resumeData.contact.city && `, ${resumeData.contact.city}`}
             {resumeData.contact.state && `, ${resumeData.contact.state}`}
             {resumeData.contact.zipCode && ` ${resumeData.contact.zipCode}`}
           </div>
         </div>

         {/* Summary Section */}
         {resumeData.summary.trim() !== '' && (
           <div className="section">
             <h2>SUMMARY</h2>
             <p className="summary">{resumeData.summary}</p>
           </div>
         )}

         {/* Education Section */}
         {resumeData.education.length > 0 && (
           <div className="section">
             <h2>EDUCATION</h2>
             {resumeData.education.map((edu, index) => (
               <div key={index} className="education-item">
                 <div className="degree">{edu.degree} in {edu.major}</div>
                 <div className="school">{edu.school}</div>
                 <div className="date-range">{edu.graduationDate}</div>
                 {edu.gpa && <div>GPA: {edu.gpa}</div>}
                 {edu.relevantCourses && <div className="relevant-courses">Relevant Courses: {edu.relevantCourses}</div>}
                 {edu.honorsAwards && <div className="honors-awards">Honors and Awards: {edu.honorsAwards}</div>}
               </div>
             ))}
           </div>
         )}

         {/* Experience Section */}
         {resumeData.experiences.length > 0 && (
           <div className="section">
             <h2>EXPERIENCE</h2>
             {resumeData.experiences.map((exp, index) => (
               <div key={index} className="experience-item">
                 <div>
                   <span className="job-title">{exp.jobTitle}</span>
                   <span className="date-range">{exp.startDate} - {exp.endDate}</span>
                 </div>
                 <div className="company">{exp.company}{exp.location && `, ${exp.location}`}</div>
                 <div className="description">{exp.description}</div>
                 {exp.achievements.filter(ach => ach.trim() !== '').length > 0 && (
                   <ul className="achievements-list">
                     {exp.achievements.filter(ach => ach.trim() !== '').map((ach, i) => (
                       <li key={i}>{ach}</li>
                     ))}
                   </ul>
                 )}
               </div>
             ))}
           </div>
         )}

         {/* Projects Section */}
         {resumeData.projects.length > 0 && (
           <div className="section">
             <h2>PROJECTS</h2>
             {resumeData.projects.map((project, index) => (
               <div key={index} className="project-item">
                 <div className="project-name">{project.projectName}</div>
                 <div className="project-tech">{project.technologies}</div>
                 <div className="project-description">{project.description}</div>
                 <div className="project-links">
                   {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                   {project.githubRepo && <a href={project.githubRepo} target="_blank" rel="noopener noreferrer">GitHub Repo</a>}
                 </div>
               </div>
             ))}
           </div>
         )}

         {/* Skills Section */}
         {resumeData.skills.filter(skill => skill.trim() !== '').length > 0 && (
           <div className="section">
             <h2>SKILLS</h2>
             <div className="skills-list">
               {resumeData.skills.filter(skill => skill.trim() !== '').map((skill, index) => (
                 <div key={index} className="skill">{skill}</div>
               ))}
             </div>
           </div>
         )}
       </div>
     </div>
   );
 }

 export default ProfilePage;