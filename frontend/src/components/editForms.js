import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editForms.css';

const EditForms = ({ formData, onSave, onClose, onChange }) => {
  const [editFormData, setEditFormData] = useState(formData);
  const [majors, setMajors] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState(formData.selectedMajors || []);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/major'); // Replace with your API endpoint
        setMajors(response.data);
      } catch (err) {
        console.error('Error fetching majors:', err);
      }
    };

    fetchMajors();
  }, []);

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    onChange(id, value); // Passing the change up if necessary
  };

  const handleMajorChange = (event) => {
    const { value, checked } = event.target;

    setSelectedMajors((prevSelectedMajors) =>
      checked
        ? [...prevSelectedMajors, value]
        : prevSelectedMajors.filter((major) => major !== value)
    );
  };

  const handleSave = () => {
    onSave({ ...editFormData, selectedMajors }); // Passing the edited form data to the parent
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <h2>Edit Educational Details</h2>
        <form>
          <label htmlFor="degree">Degree:</label>
          <select
            id="degree"
            value={editFormData.degree || ''}
            onChange={handleFormChange}
            required
          >
            <option value="" hidden>
              Select Degree
            </option>
            <option value="Terminal">Terminal</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>

          <label htmlFor="major">Major:</label>
          <div>
            {majors.map((major) => (
              <div className="checkboxContainer" key={major._id}>
                <input
                  type="checkbox"
                  name="selectedMajors"
                  value={major._id}
                  checked={selectedMajors.includes(major._id)}
                  onChange={handleMajorChange}
                />
                <label>{major.name}</label>
              </div>
            ))}
          </div>

          <label htmlFor="university">University:</label>
          <input
            type="text"
            id="university"
            value={editFormData.university || ''}
            onChange={handleFormChange}
            required
          />

          <button type="button" onClick={handleSave}>
            Save Changes
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForms;
