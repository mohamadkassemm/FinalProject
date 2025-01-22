import React from 'react';
import './MajorDetails.css';

const MajorDetails = ({ course, onClose, website }) => {
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
        <a href={`${website}`}>
          Register
        </a>
      </div>
    </div>
  );
};

export default MajorDetails;
