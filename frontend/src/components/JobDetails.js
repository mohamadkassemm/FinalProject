import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './JobDetails.css'; // Optional: Add CSS for styling

const JobDetails = ({ position, onClose, email}) => {

  const [role, setRole] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');

  useEffect(()=>{
    const fetchUserType = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        const response = await axios.get(
          `http://localhost:3001/api/v1/user/role/${userID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const roleData = response.data.role.toLowerCase();
        setRole(roleData);
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };

    fetchUserType();

  },[userID])

  if (!position) return null; // Don't render the modal if no position is passed

  return (
    role === null ? (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    ) : (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{position.name}</h2>
          <p><strong>Description:</strong> {position.description}</p>
          <p><strong>Expected Salary:</strong> ${position.expectedSalary}</p>
          <button onClick={onClose} className="close-button">Close</button>
          {role === 'student' && (
            <a 
              href={`mailto:${email}?subject=Application for Available Position&body=Dear Hiring Team,%0D%0A%0D%0APlease find my resume attached for your consideration.`} 
              className="emailLink"
            >
              <button className="apply-button">Apply!</button>
            </a>
          )}
        </div>
      </div>
    )
  );
  
};

export default JobDetails;
