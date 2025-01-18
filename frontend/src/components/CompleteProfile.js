import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Forms.css';
import { useLocation } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'
  const [majors, setMajors] = useState([]);
  const [unis, setUnis] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]); // Store selected majors
  const [isLoading, setIsLoading] = useState(true); // To handle the loading state
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid'); 
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

        if (response.data.status === true ) {
          navigate(`/home?userid=${userID}`); // Redirect to home if the profile is complete
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
        const response = await axios.get(`http://localhost:3001/api/v1/user/role/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const roleData = response.data.role.toLowerCase();
        setRole(roleData);
      } catch (err) {
        setError('Unable to fetch user role. Please log in.');
        handleSnackbar('error', 'Unable to fetch user role. Please log in.');
        navigate(`/login?userid=${userID}`);
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

    const fetchUnis = async ()=>{
      try {
        const response = await axios.get('http://localhost:3001/api/v1/university'); // Fetch majors
        setUnis(response.data); // Assuming majors is an array of major objects
      } catch (err) {
        console.error('Error fetching majors:', err);
      }
    }

    checkIfCompleted();
    fetchUserRole();
    fetchMajors();
    fetchUnis()
  }, [navigate, userID]);

  const handleSnackbar = (type, message) => {
    setSnackbarType(type);
    type === 'error' ? setError(message) : setSuccess(message);
    setSnackbarOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const logo = e.target.value;
    console.log(logo)
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
  
    const updatedFormData = { ...formData };
    console.log(updatedFormData)
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/completeProfile', updatedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const idMatch = response.data.message.match(/_id: new ObjectId\('(.+?)'\)/);
      const studentId = idMatch ? idMatch[1] : null;

      if (studentId) 
        console.log('Student ID:', studentId);

      console.log('Received response:', response);
      navigate(`/home?userid=${userID}`);
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
            <select name="gender" onChange={handleChange} required>
              <option value="" hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label>Governorate:</label>
            <select name="governorate" onChange={handleChange} required>
              <option value="" hidden>
                Select Governorate
              </option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Bekaa">Bekaa</option>
              <option value="Mount Lebanon">Mount Lebanon</option>
              <option value="Beirut">Beirut</option>
              <option value="Akkar">Akkar</option>
              <option value="Baalbek-Hermel">Baalbek-Hermel</option>
              <option value="Nabatieh">Nabatieh</option>
            </select>

            <label>Degree:</label>
            <select name="degree" onChange={handleChange} required>
              <option value="" hidden>
                Select Degree
              </option>
              <option value="Terminal">Terminal</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            <div>
              {majors.map((major) => (
                <div className="checkboxContainer" key={major._id}>
                  <input
                    type="checkbox"
                    name="major"
                    value={major._id}
                    onChange={handleChange}
                  />
                  <label>{major.name}</label>
                </div>
              ))}
            </div>
            <label>Job Status:</label>
            <select name="jobStatus" onChange={handleChange} required>
              <option value="" hidden>
                Select Job Status
              </option>
              <option value="Unemployed">Unemployed</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
              <option value="Self-employed">Self-employed</option>
            </select>

            <label htmlFor="university">University:</label>
            <select
              name="university"
              id="university"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <option value="" hidden>Select your university</option>
              {unis.map((uni) => (
                <option key={uni._id} value={uni.abbreviation}>
                  {uni.abbreviation}
                </option>
              ))}
              <option value="other">Other (Type your own)</option>
            </select>

            {/* Show the input field if "Other" is selected */}
            {unis.university === 'other' && (
              <input
                type="text"
                name="university"
                placeholder="Enter your university"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            )}

            <label>LinkedIn Profile:</label>
            <input type="url" name="linkedIn" placeholder="LinkedIn URL" onChange={handleChange} />
          </>
        );
      case 'university':
        return (
          <>
            <label>Website:</label>
            <input type='text' name='website' placeholder='University Website' onChange={handleChange}/>
            <label>Logo:</label>
            <input type="text" name="logo" placeholder="Enter image URL" onChange={handleChange} />
            <label>Abbreviation:</label>
            <input type="text" name="abbreviation" placeholder="Abbreviation" onChange={handleChange} />
            <label>Governorate:</label>
            <select name="governorate" onChange={handleChange}>
              <option value="" hidden>
                Select Governorate
              </option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Bekaa">Bekaa</option>
              <option value="Mount Lebanon">Mount Lebanon</option>
              <option value="Beirut">Beirut</option>
              <option value="Akkar">Akkar</option>
              <option value="Baalbek-Hermel">Baalbek-Hermel</option>
              <option value="Nabatieh">Nabatieh</option>
            </select>
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
            <select name="industry" onChange={handleChange}>
              <option value="" hidden>
                Select Industry
              </option>
              <option value="Tech">Tech</option>
              <option value="Medicine">Medicine</option>
              <option value="Education">Education</option>
            </select>
            <label>Governorate:</label>
            <select name="governorate" onChange={handleChange}>
              <option value="" hidden>
                Select Governorate
              </option>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Bekaa">Bekaa</option>
              <option value="Mount Lebanon">Mount Lebanon</option>
              <option value="Beirut">Beirut</option>
              <option value="Akkar">Akkar</option>
              <option value="Baalbek-Hermel">Baalbek-Hermel</option>
              <option value="Nabatieh">Nabatieh</option>
            </select>
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
