import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './LoginForm.css'; // Import the external CSS file

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        username,
        password,
      });
      alert(response.data.message); // Alert user of successful login

      // Navigate to Home page after successful login
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="heading">Login</h2>

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

        {error && <div className="error">{error}</div>}

        <button type="submit" className="button">
          Login
        </button>

        {/* Link to Register page */}
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
