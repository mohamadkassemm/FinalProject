import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentDetails.css';

const StudentDetails = ({ userID }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { studentid} = useParams();
  useEffect(() => {
    if(studentid){
        const fetchStudentDetails = async () => {
            try {
              const response = await axios.get(`http://localhost:3001/api/v1/student/${studentid}`);
              setStudent(response.data.data);
            } catch (err) {
              setError('Failed to load student details');
              console.error(err);
            } finally {
              setLoading(false);
            }
          };
      
          fetchStudentDetails();
    }
  }, [studentid]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!student) {
    return <p>No student data available.</p>;
  }
  return (
    <div className='bodyContent'>
        <div className="student-details">
            <h2>Student Information</h2>
            <p><strong>Gender:</strong> {student.gender || 'Not specified'}</p>
            <p><strong>Governorate:</strong> {student.governorate || 'Not specified'}</p>
            <p><strong>Degree:</strong> {student.degree}</p>
            <p><strong>Major:</strong> {student.major}</p>
            <p><strong>University:</strong> {student.university || 'Not specified'}</p>
            <p><strong>Experience:</strong> {student.experience?.length ? student.experience.join(', ') : 'No experience listed'}</p>
            <p><strong>Certifications:</strong> {student.certification?.length ? student.certification.join(', ') : 'No certifications listed'}</p>
            <p><strong>LinkedIn:</strong> 
                {student.linkedIn ? <a href={student.linkedIn} target="_blank" rel="noopener noreferrer">View Profile</a> : 'Not available'}
            </p>
            <p><strong>Job Status:</strong> {student.jobStatus}</p>
            {student.jobStatus !== 'Unemployed' && (
                <p><strong>Company Working For:</strong> {student.companyWorkingFor || 'Not specified'}</p>
            )}
            <p><strong>Bootcamp Status:</strong> {student.bootcampStatus || 'Not specified'}</p>
            {student.resume && (
                <p><strong>Resume:</strong> <a href={student.resume} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
            )}
        </div>
    </div>   
  );
};

export default StudentDetails;
