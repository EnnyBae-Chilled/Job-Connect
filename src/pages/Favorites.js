import React from 'react';
import "./favorites.css"

const FavoritesPage = () => {
  // In a real application, you'd fetch or manage favorite jobs here
  const favoriteJobs = JSON.parse(localStorage.getItem('favoriteJobs')) || [];

  return (
    <div className="favorites-page">
      <h2>My Favorite Jobs</h2>
      {favoriteJobs.length === 0 ? (
        <p>No jobs added to favorites yet.</p>
      ) : (
        favoriteJobs.map(job => (
          <div key={job.id} className="favorite-job-card">
            <h3>{job.title}</h3>
            <p className="company">{job.company?.display_name}</p>
            <p className="location">{job.location?.display_name}</p>
            <div className="job-meta">
              {job.salary_min !== null && job.salary_max !== null ? (
                <span>${job.salary_min} - ${job.salary_max}</span>
              ) : job.salary_min !== null ? (
                <span>${job.salary_min}+</span>
              ) : job.salary_max !== null ? (
                <span>Up to ${job.salary_max}</span>
              ) : (
                <span>Salary not specified</span>
              )}
              <span>{job.contract_type}</span>
            </div>
            <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="apply-button">
              Apply Now
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;