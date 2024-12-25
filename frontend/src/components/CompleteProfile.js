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

  useEffect(() => {
    // Fetch user role and available majors when the component mounts
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
        const response = await axios.get('http://localhost:3001/api/v1/majors'); // Fetch majors
        setMajors(response.data); // Assuming majors is an array of major objects
      } catch (err) {
        console.error('Error fetching majors:', err);
      }
    };

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

    // Include selected majors in the form data before submission
    const updatedFormData = { ...formData, selectedMajors };

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/completeProfile', updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleSnackbar('success', response.data.message || 'Profile completed successfully!');
      setTimeout(() => navigate('/home'), 2000); // Redirect after a delay
    } catch (err) {
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
            <label>Available Positions:</label>
            <textarea name="availablePositions" placeholder="Available Positions" onChange={handleChange}></textarea>
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

            <label>Social Media Links:</label>
            <textarea name="socialMediaLinks" placeholder="Social Media Links" onChange={handleChange}></textarea>

            <label>Awards:</label>
            <textarea name="awards" placeholder="Awards" onChange={handleChange}></textarea>

            <label>Available Positions:</label>
            <textarea name="availablePositions" placeholder="Available Positions" onChange={handleChange}></textarea>
          </>
        );
      default:
        return <p>Loading role-specific fields...</p>;
    }
  };

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
