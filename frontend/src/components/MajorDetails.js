import React from 'react';
import { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './MajorDetails.css';
import axios from 'axios';

const MajorDetails = ({ course, onClose, website }) => {
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

    console.log(course)
  if (!course) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h2>{course.name}</h2>
        <p>{course.description}</p>
        <div className="courseDetail">
        <label>Course Count:</label>
        <p>{course.courseCount}</p>
        </div>
        <div className="courseDetail">
        <label>Total Cost:</label>
        <p>${course.totalCost}</p>
        </div>
        <div className="courseDetail">
        <label>Number of Students:</label>
        <p>{course.studentCount}</p>
        </div>
        <div className="courseDetail">
        <label>Number of Semesters:</label>
        <p>{course.nbOfSemester}</p>
        </div>
        {role==='student' &&
        ( <a href={`${website}`}>
            Register
          </a>
        )}
      </div>
    </div>
  );
};

export default MajorDetails;
