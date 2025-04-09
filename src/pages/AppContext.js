import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const storedAppliedJobs = localStorage.getItem('appliedJobs');
    return storedAppliedJobs ? JSON.parse(storedAppliedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  return (
    <AppContext.Provider value={{ appliedJobs, setAppliedJobs }}>
      {children}
    </AppContext.Provider>
  );
};