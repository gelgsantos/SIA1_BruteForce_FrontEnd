import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./UploadedFilesPage.css";

const UploadedFilesPage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [password, setPassword] = useState("");

  // Fetch files from the backend
  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/files");
      setFiles(response.data);
      console.log(response.data); // Debugging
    } catch (err) {
      setError("Failed to fetch files");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files when the component mounts
  }, []);

  const handleSelectForBruteforce = async (file) => {
    try {
      setSelectedFile(file);

      console.log("Initiating brute force for file:", file); // Debugging

      const response = await axios.post("http://127.0.0.1:5000/api/bruteforce", {
        file_id: file.id,
      });

      console.log("Brute force response:", response.data); // Debugging

      if (response.data.result) {
        setPassword(response.data.result.password || "No password found.");
      } else {
        setPassword("Brute force completed, but no password was found.");
      }

      setBasicModal(true); // Ensure this is called after setting the password

      // Refresh the file list after the brute force operation is completed
      fetchFiles();
    } catch (err) {
      setError("Failed to initiate brute force");
      console.error(err);
    }
  };

  return (
    <>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="bg-primary text-white">
              <MDBModalTitle>Password Retrieved</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="text-center">
              {password ? (
                <p className="fs-5">
                  <strong>Password:</strong> {password}
                </p>
              ) : (
                <p className="fs-5 text-danger">
                  Brute force completed, but no password was found.
                </p>
              )}
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="primary" onClick={() => setBasicModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div className="files-container">
        <h1>Files</h1>
        {error && <p className="error-message">{error}</p>}
        {files.length > 0 ? (
          <table className="files-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>File Name</th>
                <th>File Path</th>
                <th>File Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.id}</td>
                  <td>{file.filename}</td>
                  <td>
                    <a href={`http://127.0.0.1:5000/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                      {file.file_path}
                    </a>
                  </td>
                  <td>{file.file_type}</td>
                  <td>{file.bruteforce_status}</td>
                  <td>
                    <button onClick={() => handleSelectForBruteforce(file)}>
                      Bruteforce
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </>
  );
};

export default UploadedFilesPage;
