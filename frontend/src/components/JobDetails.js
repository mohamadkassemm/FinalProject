import React from 'react';
import './JobDetails.css'; // Optional: Add CSS for styling

const JobDetails = ({ position, onClose }) => {
  if (!position) return null; // Don't render the modal if no position is passed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{position.name}</h2>
        <p><strong>Description:</strong> {position.description}</p>
        <p><strong>Expected Salary:</strong> ${position.expectedSalary}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default JobDetails;
