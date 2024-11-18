import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import UploadedFilesPage from "./components/UploadedFilesPage";
import './App.css';

const App = () => {
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const handleDropdownItemClick = (setDropdownState) => {
    // Close the dropdown
    setDropdownState(false);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-left">
            {/* Home Dropdown */}
            <div className="navbar-dropdown">
              <button
                className="navbar-link dropdown-btn"
                onClick={() => setShowHomeDropdown(!showHomeDropdown)}
              >
                Home
              </button>
              {showHomeDropdown && (
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to="/home"
                    onClick={() => handleDropdownItemClick(setShowHomeDropdown)}
                  >
                    Home
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/uploaded-files"
                    onClick={() => handleDropdownItemClick(setShowHomeDropdown)}
                  >
                    Files
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="navbar-right">
            {/* User Dropdown */}
            <div className="navbar-dropdown">
              <button
                className="navbar-link dropdown-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                User
              </button>
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => handleDropdownItemClick(setShowUserDropdown)}
                  >
                    Log In
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/register"
                    onClick={() => handleDropdownItemClick(setShowUserDropdown)}
                  >
                    Register
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => handleDropdownItemClick(setShowUserDropdown)}
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="content">
          <Routes>
            {/* Default route redirects to /register */}
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/uploaded-files" element={<UploadedFilesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
