import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage"; // Example landing page
import AuthForm from "./pages/AuthForm";
import Location from "../src/pages/Location";
import Type from "../src/pages/Type";
import ResumeUpload from "./pages/Uploadresume";
import ResumeBuilder from "./pages/Resumebuilder";
import JobConnect from "./pages/JobConnnect";
import FavoritesPage from "./pages/Favorites";
import MyJobsPage from "./pages/Myjobs";
import ProfilePage from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/location" element={<Location />} />
        <Route path="/worktype" element={<Type />} />
        <Route path="/upload-resume" element={<ResumeUpload />} />
        <Route path="/landing" element={<Type />} />
        <Route path="/resumebuilder" element={<ResumeBuilder />} />
        <Route path="/jobconnect" element={<JobConnect />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myjobs" element={<MyJobsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
