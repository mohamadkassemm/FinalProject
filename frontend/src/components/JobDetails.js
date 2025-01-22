import React from 'react';
import './JobDetails.css'; // Optional: Add CSS for styling

const JobDetails = ({ position, onClose, email}) => {
  if (!position) return null; // Don't render the modal if no position is passed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{position.name}</h2>
        <p><strong>Description:</strong> {position.description}</p>
        <p><strong>Expected Salary:</strong> ${position.expectedSalary}</p>
        <button onClick={onClose} className="close-button">Close</button>
        <a href={`mailto:${email}?subject=Application for Available Position&body=Dear Hiring Team,%0D%0A%0D%0APlease find my resume attached for your consideration.`} 
                className="emailLink">
          <button className='apply-button'>Apply!</button>
        </a>
      </div>
    </div>
  );
};

export default JobDetails;
