import React, { useState, useEffect } from 'react';
import EditForms from './editForms';
import PersonalForm from './PersonalForm';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [initialUserData, setInitialUserData] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const [role, setRole] = useState('');
  const [userRoleData, setUserRoleData] = useState({});
  const [initialUserRoleData, setInitialUserRoleData] = useState({});
  const [majorName, setMajorName] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    courseCount: "",
    totalCost: "",
    studentCount: "",
    nbOfSemester: 6, // Default value from your schema
  })
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  const token = localStorage.getItem('token');
  const [editEducationForm, setEditForm] = useState(false)
  const [editPersonalForm, setEditPersonalForm] = useState(false)

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/data/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setInitialUserData(response.data);
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    if (userID) {
      fetchUserDetails();
    }
  }, [userID, token]);

  // ✅ Fetch role-specific data
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/role/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const roleData = response.data.role.toLowerCase();
        setRole(roleData);
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };
    fetchUserType();

    const fetchRoleData = async () => {
      try {
        if (initialUserData.role && userID) {
          const response = await axios.get(
            `http://localhost:3001/api/v1/${initialUserData.role}/ID/${userID}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const roleData = await axios.get(
            `http://localhost:3001/api/v1/${initialUserData.role}/${response.data}`
          );
          setUserRoleData(roleData.data);
          setInitialUserRoleData(roleData.data);

          if (roleData?.data?.data?.major) {
            const majorResponse = await axios.get(
              `http://localhost:3001/api/v1/major/${roleData.data.data.major}`
            );
            if (majorResponse) setMajorName(majorResponse.data);
          }
        }
      } catch (error) {
        console.error('Error fetching role data:', error.message);
      }
    };
    fetchRoleData();
  }, [initialUserData.role, userID, token]);

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the corresponding field
    }));
  };

  const handleFormSave = async (data) => {
    try {
      // Perform the API request to save the form data
      const response = await axios.put(
        `http://localhost:3001/api/v1/${role}/${userID}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setUserData(response.data); // Update the user data after saving
        setInitialUserData(response.data);
        setEditForm(false); // Close the edit form
        Swal.fire({
          icon: 'success',          // Sets the success icon
          title: 'Success!',        // Title of the alert
          text: 'Your changes have been saved.', // Message body
          confirmButtonText: 'OK',  // Text for the confirm button
        }).then(() => {
          window.location.reload(); // Refresh the page after user acknowledges success
        });;
        
      }
    } catch (error) {
      console.error('Error saving form data:', error.message);
    }
  };

  const handlePersonalSave = (updatedData) => {
    // You can now send updatedData to your API to save it
    setUserData(updatedData); // Update local state with the saved data
  };

  const showEducationalForm = () => {
    setEditForm(true);
  };

  const showPersonalForm = ()=>{
    setEditPersonalForm(true)
  }

  // ✅ Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCloseForm = ()=>{
    setEditForm(false)
  }

  const handleClosePersonalForm = ()=>{
    setEditPersonalForm(false)
  }

  return (
    <div className="profilePage">
      <div className="leftSidebar">
        <ul>
          <li
            className={activeTab === 'personal' ? 'active' : ''}
            onClick={() => handleTabClick('personal')}
          >
            Personal
          </li>
          <li
            className={activeTab === 'educational' ? 'active' : ''}
            onClick={() => handleTabClick('educational')}
          >
            Educational
          </li>
          {role !== 'student' && (
            <li
              className={activeTab === 'work' ? 'active' : ''}
              onClick={() => handleTabClick('work')}
            >
              Work
            </li>
          )}
        </ul>
      </div>
      <div className="profileContent">
        <h2>Hello {userName}</h2>

        {activeTab === 'personal' && (
          <div className="dataContainer">
            <h2>Personal Details</h2>
            <form>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={userData?.name || ''}
                disabled
              />

              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={userData?.username || ''}
                disabled
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={userData?.email || ''}
                disabled
              />

              {role === 'student' && (
                <>
                  <label htmlFor="gender">Gender:</label>
                  <input
                    id="gender"
                    value={initialUserRoleData?.data?.gender || ''}
                    disabled
                  />
                </>
              )}

              <label htmlFor="governorate">Governorate:</label>
              <input
                id="governorate"
                value={initialUserRoleData?.data?.governorate || ''}
                disabled
              />

              <label htmlFor="joinedAt">Joined at:</label>
              <input
                type="text"
                id="joinedAt"
                value={initialUserData?.createdAt || ''}
                disabled
              />

              <button type="button" onClick={showPersonalForm}>
                Edit
              </button>
              
            </form>
          </div>
        )}

        {activeTab === 'educational' && role === 'student' && (
          <div className="dataContainer">
            <h2>Educational Details</h2>
            <p className="note">
              <i className="fa fa-warning">Note:</i> Select the highest educational level please!
            </p>
            <form>
              <label htmlFor="degree">Degree:</label>
              <input
                type="text"
                id="degree"
                value={userRoleData?.data?.degree || ''}
                disabled
              />

              <label htmlFor="major">Major:</label>
              <input type="text" id="major" value={majorName || ''} disabled />

              <label htmlFor="university">University:</label>
              <input
                type="text"
                id="university"
                value={userRoleData?.data?.university || ''}
                disabled
              />

              <button type="button" onClick={showEducationalForm}>
                Edit
              </button>
            </form>
          </div>
        )}

        {activeTab === 'educational' && role === 'university' && (
          <div className="dataContainer">
            <h2>Educational Details</h2>
            <h4>Add Major</h4>
            <form>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter Major Name"
                required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Enter Major Description"
                style={{ width: "100%", height: "100px" }}
              />

              <label htmlFor="courseCount">Number of Courses:</label>
              <input
                type="number"
                id="courseCount"
                value={formData.courseCount}
                onChange={handleFormChange}
                placeholder="Enter Number of Courses"
                required
                min="1"
              />

              <label htmlFor="totalCost">Total Cost:</label>
              <input
                type="number"
                id="totalCost"
                value={formData.totalCost}
                onChange={handleFormChange}
                placeholder="Enter Total Cost"
                required
                min="0"
              />

              <label htmlFor="studentCount">Number of Students:</label>
              <input
                type="number"
                id="studentCount"
                value={formData.studentCount}
                onChange={handleFormChange}
                placeholder="Enter Student Count"
                min="0"
              />

              <label htmlFor="nbOfSemester">Number of Semesters:</label>
              <input
                type="number"
                id="nbOfSemester"
                value={formData.nbOfSemester}
                onChange={handleFormChange}
                placeholder="Enter Number of Semesters"
                min="6"
                max="14"
              />

              <button type="submit">Add Major</button>
            </form>
          </div>
        )}
      </div>

      {editEducationForm && (
      <EditForms
        formData={{
          degree: userRoleData?.data?.degree,
          major: majorName,
          university: userRoleData?.data?.university,
        }}
        onSave={handleFormSave}
        onClose={handleCloseForm}
        onChange={(id, value) => console.log(id, value)} // Optional for real-time updates
      />
    )}

    {
      editPersonalForm && (
        <PersonalForm userData={userData}
         initialUserRoleData={initialUserRoleData} 
         role={role} onSave={handlePersonalSave} 
         onClose={handleClosePersonalForm}/>
      )
    }
    </div>
  );
};

export default Profile;
