import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="jobconnect">JobConnect</span>
        </Link>
        <div className="nav-links">
          <Link to="/features">HOME</Link>
          <Link to="/resources">RESOURCES ▼</Link>
          <Link to="/pricing">UPLOAD YOUR RESUME</Link>
        </div>
      </div>

      <div className="nav-right">
        <Link to="/help" className="help">❓ Help</Link>
        <Link to="/login" className="signin">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
//       <div className="text-xl font-semibold">indeed <span className="text-gray-500">For Employers</span></div>
//       <div className="flex space-x-6">
//         <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
//         <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
//         <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
//       </div>
//       <div className="flex space-x-4">
//         <button className="text-gray-600 hover:text-gray-900">Help</button>
//         <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">
//           Sign in
//         </button>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//           Post a job
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
