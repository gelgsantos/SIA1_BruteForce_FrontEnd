import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './RegisterForm.css'; // Import the external CSS file

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", {
        username,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Register</h2>

        <div className="inputGroup">
          <label className="label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="inputGroup">
          <label className="label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="inputGroup">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="button">
          Register
        </button>

        {/* Link to Login page */}
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Log in here</Link></p>
        </div>

      </form>
    </div>
  );
};

export default RegisterForm;
