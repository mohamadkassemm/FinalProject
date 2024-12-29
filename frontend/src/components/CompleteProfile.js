import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Forms.css';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'
  const [majors, setMajors] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]); // Store selected majors
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state

  useEffect(() => {
    const checkIfCompleted = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      try {
        const response = await axios.get('http://localhost:3001/api/v1/user/completedStatus', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === true) {
          navigate('/home'); // Redirect to home if the profile is complete
        } else {
          setIsLoading(false); // Show the form if the profile is not complete
        }
      } catch (err) {
        setError('An error occurred while checking profile status.');
        setIsLoading(false);
        handleSnackbar('error', 'An error occurred while checking profile status.');
      }
    };

    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await axios.get('http://localhost:3001/api/v1/user/role', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const roleData = response.data.role.toLowerCase();
        setRole(roleData);
      } catch (err) {
        setError('Unable to fetch user role. Please log in.');
        handleSnackbar('error', 'Unable to fetch user role. Please log in.');
        navigate('/login');
      }
    };

    const fetchMajors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/major'); // Fetch majors
        setMajors(response.data); // Assuming majors is an array of major objects
      } catch (err) {
        console.error('Error fetching majors:', err);
      }
    };

    checkIfCompleted();
    fetchUserRole();
    fetchMajors();
  }, [navigate]);

  const handleSnackbar = (type, message) => {
    setSnackbarType(type);
    type === 'error' ? setError(message) : setSuccess(message);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'selectedMajors') {
      // Update the selected majors (add/remove from array)
      setSelectedMajors((prevSelectedMajors) => 
        checked
          ? [...prevSelectedMajors, value]
          : prevSelectedMajors.filter(major => major !== value)
      );
      console.log(value)
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }
  
    const updatedFormData = { ...formData, availableMajors: selectedMajors };
  
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/completeProfile', updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Received response:', response);
      navigate('/home');
    } catch (err) {
      console.error('Error during request:', err);
      handleSnackbar('error', err.response?.data?.message || 'An error occurred while completing your profile.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const renderFields = () => {
    switch (role) {
      case 'student':
        return (
          <>
            <label>Gender:</label>
            <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
            <label>Degree:</label>
            <input type="text" name="degree" placeholder="Degree" onChange={handleChange} />
            <label>Major:</label>
            <div>
              {majors.map((major) => (
                <div key={major._id}>
                  <input
                    type="checkbox"
                    name="selectedMajors"
                    value={major._id}
                    checked={selectedMajors.includes(major._id)}
                    onChange={handleChange}
                  />
                  <label>{major.name}</label>
                </div>
              ))}
            </div>
            <label>University:</label>
            <input type="text" name="university" placeholder="University" onChange={handleChange} />
            <label>Experience:</label>
            <textarea name="experience" placeholder="Experience" onChange={handleChange}></textarea>
            <label>Certifications:</label>
            <input type="text" name="certification" placeholder="Certifications" onChange={handleChange} />
            <label>LinkedIn Profile:</label>
            <input type="url" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} />
          </>
        );
      case 'university':
        return (
          <>
            <label>Abbreviation:</label>
            <input type="text" name="abbreviation" placeholder="Abbreviation" onChange={handleChange} />
            <label>Governorate:</label>
            <input type="text" name="governorate" placeholder="Governorate" onChange={handleChange} />
            <label>Number of Branches:</label>
            <input type="number" name="numberOfBranches" placeholder="Number of Branches" onChange={handleChange} />
            <label>Available Majors:</label>
            <div>
              {majors.map((major) => (
                <div className="checkboxContainer" key={major._id}>
                  <input
                    type="checkbox"
                    name="selectedMajors"
                    value={major._id}
                    checked={selectedMajors.includes(major._id)}
                    onChange={handleChange}
                  />
                  <label>{major.name}</label>
                </div>
              ))}
            </div>
          </>
        );
      case 'company':
        return (
          <>
            <label>Description:</label>
            <textarea name="description" placeholder="Company Description" onChange={handleChange}></textarea>
            <label>Industry:</label>
            <input type="text" name="industry" placeholder="Industry" onChange={handleChange} />
            <label>Governorate:</label>
            <input type="text" name="governorate" placeholder="Governorate" onChange={handleChange} />
            <label>Website:</label>
            <input type="url" name="website" placeholder="Website URL" onChange={handleChange} />
            <div className="socialMediaLinksContainer">
              <label>Social Media Links:</label>
              <div className="socialMediaInput">
                <i className="fab fa-facebook"></i>
                <input type="url" name="facebook" placeholder="Facebook URL" onChange={handleChange} />
              </div>
              <div className="socialMediaInput">
                <i className="fab fa-linkedin"></i>
                <input type="url" name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
              </div>
              <div className="socialMediaInput">
                <i className="fab fa-instagram"></i>
                <input type="url" name="instagram" placeholder="Instagram URL" onChange={handleChange} />
              </div>
            </div>
          </>
        );
      default:
        return <p>Loading role-specific fields...</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Please wait, checking your profile...</p>
      </div>
    );
  }
  

  return (
    <div className="body">
      <div className="container">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit} className="inputsContainer">
          {renderFields()}
          <input type="submit" value="Complete Profile" />
        </form>
      </div>

      {/* Snackbar for feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarType === 'error' ? error : success}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CompleteProfile;
