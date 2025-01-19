import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import _ from 'lodash';
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
  const userChanged = !_.isEqual(userData, initialUserData);
  const roleChanged = !_.isEqual(userRoleData, initialUserRoleData);

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
    const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const fetchUserType = async ()=>{
          const response = await axios.get(`http://localhost:3001/api/v1/user/role/${userID}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const roleData = response.data.role.toLowerCase();
          setRole(roleData);
        }
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

          if (response) {
            const output = await axios.get(
              `http://localhost:3001/api/v1/${initialUserData.role}/${response.data}`
            );
            setUserRoleData(output.data);
            setInitialUserRoleData(output.data);
            if (output?.data?.data?.major) {
              const majorResponse = await axios.get(
                `http://localhost:3001/api/v1/major/${output.data.data.major}`
              );
              setMajorName(majorResponse.data);
            }
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
  

  // ✅ Handle input changes
  const handleChange = (field, value) => {
    // Detect which data type the field belongs to and update accordingly
    if (field in initialUserData) {
      setUserData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else if (field in initialUserRoleData) {
      console.log(initialUserRoleData)
      setUserRoleData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
      console.log(userRoleData)
    }
  };

  const handleFormSubmit = async(e) => {
    try{
      e.preventDefault();
      const response = await axios.post(`http://localhost:3001/api/v1/major/${userRoleData._id}`, {
        name: formData.name,
        description: formData.description,
        courseCount: formData.courseCount,
        totalCost: formData.totalCost,
        studentCount: formData.studentCount,
        nbOfSemester: formData.nbOfSemester,
      });
      if(response){
        console.log("Success")
      }
    }catch(err){
      console.error('Error saving data:', err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while saving your data!',
      });
    }
  }

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update user data if changed
      if (userChanged) {
        await axios.put(`http://localhost:3001/api/v1/user/editProfile/${userID}`, userData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      // Update role data if changed
      if (roleChanged) {
        await axios.put(
          `http://localhost:3001/api/v1/${initialUserData.role}/${initialUserRoleData.data._id}`,
          userRoleData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data has been saved successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error('Error saving data:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while saving your data!',
      });
    }
  };

  // ✅ Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
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
        </ul>
      </div>

      <div className="profileContent">
        <h2>Hello {userName}</h2>

        {activeTab === 'personal' && (
          <div className="dataContainer">
            <h2>Personal Details</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={userData?.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
              />

              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={userData?.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={userData?.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />

              {
                role==='student' && (
                <>
                  <label htmlFor="gender">Gender:</label>
                <select
                  id="gender"
                  value={initialUserRoleData?.data?.gender || ''}
                  onChange={(e) => handleChange('gender', e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                </>
                )
              }
          

              <label htmlFor="governorate">Governorate:</label>
                    <select
                      name="governorate"
                      id="governorate"
                      value={initialUserRoleData?.data?.governorate || ''}
                      onChange={(e) => handleChange('governorate', e.target.value)}
                    >
                      <option value="" hidden>Select Governorate</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="Bekaa">Bekaa</option>
                      <option value="Mount Lebanon">Mount Lebanon</option>
                      <option value="Beirut">Beirut</option>
                      <option value="Akkar">Akkar</option>
                      <option value="Baalbek-Hermel">Baalbek-Hermel</option>
                      <option value="Nabatieh">Nabatieh</option>
                    </select>

                    <label htmlFor="joinedAt">Joined at:</label>
                    <input
                      type="text"
                      id="joinedAt"
                      value={initialUserData?.createdAt || ''}
                      disabled
                    />

              <button type="submit" disabled={!userChanged && !roleChanged}>
                Save
              </button>
            </form>
          </div>
        )}

        {activeTab === 'educational' && role === 'student' && (
          <div className="dataContainer">
            <h2>Educational Details</h2>
            <p className='note'><i className='fa fa-warning'>Note:</i> Select the highest educational level please!</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="degree">Degree:</label>
              <input
                type="text"
                id="degree"
                value={userRoleData?.data?.degree || ''}
                onChange={(e) => handleChange('degree', e.target.value)}
              />

              <label htmlFor="major">Major:</label>
              <input
                type="text"
                id="major"
                value={majorName || ''}
                onChange={(e) => handleChange('major', e.target.value)}
              />

              <label htmlFor="university">University:</label>
              <input
                type="text"
                id="university"
                value={userRoleData?.data?.university || ''}
                onChange={(e) => handleChange('university', e.target.value)}
              />

              <button type="submit" disabled={!userChanged && !roleChanged}>
                Save
              </button>
            </form>
          </div>
        )}

        {activeTab === 'educational' && role === 'university' && (
          <div className="dataContainer">
            <h2>Educational Details</h2>
            <h4>Add Major</h4>
            <form onSubmit={handleFormSubmit}>
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
    </div>
  );
};

export default Profile;
