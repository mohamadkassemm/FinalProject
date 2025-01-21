import React, { useState } from 'react';
import './editForms.css'

const PersonalForm = ({ userData, initialUserRoleData, role, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    username: userData?.username || '',
    email: userData?.email || '',
    gender: initialUserRoleData?.data?.gender || '',
    governorate: initialUserRoleData?.data?.governorate || '',
  });

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData); // Pass edited data to parent for saving
  };

  return (
    <div className='modal'>
        <div className="modalContent">
            <form>
                <label htmlFor="fullName">Full Name:</label>
                <input
                type="text"
                id="fullName"
                value={formData.name}
                onChange={handleFormChange}
                />

                <label htmlFor="username">Username:</label>
                <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleFormChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleFormChange}
                />

                {role === 'student' && (
                <>
                    <label htmlFor="gender">Gender:</label>
                    <select
                    id="gender"
                    value={formData.gender}
                    onChange={handleFormChange}
                    >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </select>
                </>
                )}

                <label htmlFor="governorate">Governorate:</label>
                <input
                id="governorate"
                value={formData.governorate}
                onChange={handleFormChange}
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

export default PersonalForm;
