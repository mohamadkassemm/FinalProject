import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/user/role', {
          withCredentials: true,
        });
        const roleData=response.data.role;
        setRole(roleData.toLowerCase());
      } catch (err) {
        setError('Unable to fetch user role. Please log in.');
        navigate('/login');
      }
    };
    fetchUserRole();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/completeProfile', formData, {
        withCredentials: true,
      });
      setSuccess(response.data.message || 'Profile completed successfully!');
      setError('');
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while completing your profile.');
    }
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
            <input type="text" name="major" placeholder="Major" onChange={handleChange} />

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
            <textarea name="availableMajors" placeholder="Available Majors" onChange={handleChange}></textarea>

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
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
