import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Students.css';

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');

  const [students, setStudents] = useState([]);
  const [names, setNames] = useState({});

  async function getName(id) {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/user/getName/${id}`);
      console.log(response)
      const name = response.data.name;
      setNames((prevNames) => ({
        ...prevNames,
        [id]: name,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    
    axios
      .get('http://localhost:3001/api/v1/student') // Adjust endpoint for fetching students
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));

    students.forEach((student) => {
      if (!names[student._id]) {
        getName(student._id);
      }
    });

  }, [students, names, userID]);

  return (
    <div className='studentsContainer'>
      <h2>Students</h2>
      {students.length > 0 && (
        <div className='studentsCards'>
          {students.map((student) => (
            <div
              className='studentCard'
              key={student._id}
              onClick={() => navigate(`/studentDetails/${student._id}?userID=${userID}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={student.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt={names[student._id] || 'Student Profile'}
              />
              <h4>{names[student._id] || 'Loading...'}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
