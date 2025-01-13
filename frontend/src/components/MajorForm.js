import React, { useState } from 'react';
import './Forms.css';

const MajorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseCount: '',
    totalCost: '',
    studentCount: '',
    nbOfSemester: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      courseCount: '',
      totalCost: '',
      studentCount: '',
      nbOfSemester: '',
    });
  };

  return (
    <form className="majorForm" onSubmit={handleSubmit}>
      <h2>Add Major</h2>

      <div className="formGroup">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="formGroup">
        <label htmlFor="courseCount">Course Count:</label>
        <input
          type="number"
          id="courseCount"
          name="courseCount"
          value={formData.courseCount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="totalCost">Total Cost:</label>
        <input
          type="number"
          id="totalCost"
          name="totalCost"
          value={formData.totalCost}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="studentCount">Student Count:</label>
        <input
          type="number"
          id="studentCount"
          name="studentCount"
          value={formData.studentCount}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formGroup">
        <label htmlFor="nbOfSemester">Number of Semesters:</label>
        <input
          type="number"
          id="nbOfSemester"
          name="nbOfSemester"
          value={formData.nbOfSemester}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submitButton">Submit</button>
    </form>
  );
};

export default MajorForm;
