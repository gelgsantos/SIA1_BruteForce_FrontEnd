import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // For navigation (e.g., logout or other pages)
import './Home.css';

const Home = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);  // Store the selected file
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);  // Append the file to the form data

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set the correct header for file upload
        },
      });
      setMessage(response.data.message);  // Show success message from backend
    } catch (error) {
      setMessage('File upload failed. Please try again.');
    }
  };

  return (
    <div>
      {/* Home Page Content */}
      <div className="home-container">
        <h1 className="home-heading">BRUTEFORCE</h1>
        <p className="home-message">what file would you like to bruteforce today?</p>

        {/* File Upload Form */}
        <div className="file-upload">
          <h2>Upload a File</h2>
          <form onSubmit={handleFileUpload}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload File</button>
          </form>
          {message && <p>{message}</p>}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
