import React, { useState, useEffect } from 'react';
import './JobConnect.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaHeart, FaComment, FaBriefcase } from 'react-icons/fa';

const JobConnect = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favoriteJobs');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [appliedJobs, setAppliedJobs] = useState(() => {
        const storedAppliedJobs = localStorage.getItem('appliedJobs');
        return storedAppliedJobs ? JSON.parse(storedAppliedJobs) : [];
    });
    const [favoritedJobIds, setFavoritedJobIds] = useState(() => new Set(favorites.map(job => job.id)));
    const [locationFilter, setLocationFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const navigate = useNavigate();
    const appId = '55d71e86'; // Replace with your actual app ID
    const appKey = 'f25039c3ae90734556314387fed4c69c'; // Replace with your actual app key

    useEffect(() => {
        const fetchJobs = async () => {
            if (!appId || !appKey) {
                console.warn("Adzuna App ID or App Key not provided.");
                return;
            }
            try {
                const response = await fetch(
                    `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&what=${searchTerm}`
                );
                const data = await response.json();
                if (data && data.results) {
                    setJobs(data.results);
                } else {
                    setJobs([]);
                    console.warn("No job results found or invalid data format from Adzuna.");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, [searchTerm, appId, appKey]);

    useEffect(() => {
        let filtered = jobs;

        if (locationFilter) {
            filtered = filtered.filter(job =>
                job.location?.display_name?.toLowerCase().includes(locationFilter.toLowerCase())
            );
        }

        if (companyFilter) {
            filtered = filtered.filter(job =>
                job.company?.display_name?.toLowerCase().includes(companyFilter.toLowerCase())
            );
        }

        setFilteredJobs(filtered);
        setSelectedJob(filtered[0] || null); // Select the first filtered job
    }, [jobs, locationFilter, companyFilter]);

    useEffect(() => {
        localStorage.setItem('favoriteJobs', JSON.stringify(favorites));
        setFavoritedJobIds(new Set(favorites.map(job => job.id)));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    }, [appliedJobs]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddToFavorites = (job) => {
        if (!favorites.some(favJob => favJob.id === job.id)) {
            setFavorites([...favorites, job]);
        } else {
            setFavorites(favorites.filter(favJob => favJob.id !== job.id));
        }
    };

    const handleApplyNow = () => {
      if (selectedJob?.redirect_url) {
        window.open(selectedJob.redirect_url, '_blank');
        if (!appliedJobs.some(appliedJob => appliedJob.id === selectedJob.id)) {
          const updatedAppliedJobs = [...appliedJobs, selectedJob];
          setAppliedJobs(updatedAppliedJobs);
          localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
          // Optionally, if the user is on the /myjobs page, force a reload
          if (window.location.pathname === '/myjobs') {
            window.location.reload();
          }
        }
      } else {
        alert("No application link available for this job.");
      }
    };
    // const handleFavoriteApply = (job) => {
    //     if (job?.redirect_url) {
    //         window.open(job.redirect_url, '_blank');
    //         if (!appliedJobs.some(appliedJob => appliedJob.id === job.id)) {
    //             setAppliedJobs([...appliedJobs, job]);
    //         }
    //     } else {
    //         alert("No application link available for this job.");
    //     }
    // };

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
                        <Link to="/myjobs" className="user-nav-item">
                            <FaBriefcase className="user-nav-icon" />
                            <span>My Jobs</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Search Header */}
            <div className="search-header">
                <input
                    type="text"
                    placeholder="Job title, Keywords, or company"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Welcome Banner */}
            <div className="welcome-banner">
                <h1>Welcome, Eniola</h1>
                <p>Jobs for you</p>
            </div>

            <div className="job-content">
                {/* Filters Sidebar */}
                <div className="filters-sidebar">
                    <h3>Filter By:</h3>
                    <div className="filter-group">
                        <h4>Location</h4>
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <h4>Company</h4>
                        <input
                            type="text"
                            placeholder="Enter company"
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
                        />
                    </div>
                    {/* Add more filters here (e.g., Salary Range, Contract Type) */}
                </div>

                {/* Job Listings */}
                <div className="job-listings">
                    {filteredJobs.map(job => (
                        <div
                            key={job.id}
                            className={`job-card ${selectedJob?.id === job.id ? 'active' : ''}`}
                            onClick={() => setSelectedJob(job)}
                        >
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
                            <div className="job-actions">
                                <button
                                    className={`favorite-button ${favoritedJobIds.has(job.id) ? 'favorited' : ''}`}
                                    onClick={() => handleAddToFavorites(job)}
                                >
                                    <FaHeart /> {favoritedJobIds.has(job.id) ? 'Favorited' : 'Favorite'}
                                </button>
                                <a href={job.redirect_url} target="_blank" rel="noopener noreferrer" className="apply-button">
                                    Apply Now
                                </a>
                            </div>
                            <p className="post-date">Active 3 days ago</p>
                        </div>
                    ))}
                    {filteredJobs.length === 0 && jobs.length > 0 && (
                        <p>No jobs match your current filters.</p>
                    )}
                    {jobs.length === 0 && <p>Loading jobs...</p>}
                </div>

                {/* Selected Job Details */}
                {selectedJob && (
                    <div className="job-details">
                        <h2>{selectedJob.title}</h2>
                        <p className="company-location">
                            {selectedJob.company?.display_name} | {selectedJob.location?.display_name}
                        </p>

                        <div className="job-meta-details">
                            {selectedJob.salary_min !== null && selectedJob.salary_max !== null ? (
                                <p>Salary: ${selectedJob.salary_min} - ${selectedJob.salary_max} per hour</p>
                            ) : selectedJob.salary_min !== null ? (
                                <p>Salary: ${selectedJob.salary_min}+ per hour</p>
                            ) : selectedJob.salary_max !== null ? (
                                <p>Salary: Up to ${selectedJob.salary_max} per hour</p>
                            ) : (
                                <p>Salary: Not specified</p>
                            )}
                            {selectedJob.contract_type && <p>Contract Type: {selectedJob.contract_type}</p>}
                        </div>

                        <div className="job-description">
                            <h3>Job Description</h3>
                            <div dangerouslySetInnerHTML={{ __html: selectedJob.description }} />
                        </div>

                        <button className="apply-now-details" onClick={handleApplyNow}>
                            Apply Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobConnect;