import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const [userRoleData, setUserRoleData] = useState({});
  const [majorName, setMajorName] = useState('')
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  const token = localStorage.getItem('token');
  const [hasChanged, setHasChanged] = useState(false);

  // ✅ Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/data/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
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
    const fetchRoleData = async () => {
      try {
        if (userData.role && userID) {
          const response = await axios.get(`http://localhost:3001/api/v1/${userData.role}/ID/${userID}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if(response){
            const output = await axios.get(`http://localhost:3001/api/v1/${userData.role}/${response.data}`)
            setUserRoleData(output.data)
            if(userRoleData?.data?.major){
              const response = await axios.get(`http://localhost:3001/api/v1/major/${userRoleData?.data?.major}`)
              setMajorName(response.data)
              }
            }
          }
         
        }catch (error) {
          console.error('Error fetching role data:', error.message);
        }
    };

    fetchRoleData();
  }, [userData.role, userID, token, userRoleData?.data?.major]);

  // ✅ Handle input changes
const handleChange = (field, value) => {
  console.log(field, value); // Log the field and value for debugging
  setHasChanged(true);

  // Check if the field belongs to userData or userRoleData
  if (field in userData) {
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  } else if (field in userRoleData?.data) {
    setUserRoleData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        [field]: value,
      },
    }));
  }

  console.log(userData, userRoleData); // Log the updated state for debugging
};


  // ✅ Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      await axios.put(`http://localhost:3001/api/v1/user/editProfile/${userID}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHasChanged(false); // Reset the hasChanged state
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Data has been saved successfully!',
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('Error saving data');
    }
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
                {userData.role === 'student' && userRoleData && (
                  <div>
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

                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      value={userRoleData?.data?.gender || ''}
                      onChange={(e) => handleChange('gender', e.target.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    <label htmlFor="governorate">Governorate:</label>
                    <select
                      name="governorate"
                      id="governorate"
                      value={userRoleData?.data?.governorate || ''}
                      onChange={(e) => handleChange('governorate', e.target.value)}
                      required
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
                      value={userData?.createdAt || ''}
                      disabled
                    />
                  </div>
                )}
                <button type='submit' disabled={!hasChanged} >Save</button>
            </form>
          </div>
        )}
        
        {activeTab === 'educational' && (
          <div className='dataContainer'>
            <h2>Educational Details</h2>
            <form onSubmit={handleSubmit}>
            {userData.role === 'student' && userRoleData && (
              <div>
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

                <label htmlFor="jobStatus">Job Status:</label>
                <select
                  id="jobStatus"
                  value={userRoleData?.data?.jobStatus || ''}
                  onChange={(e) => handleChange('jobStatus', e.target.value)}
                >
                  <option value="" hidden></option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
            </div>
            )}
                <button type="submit" disabled={!hasChanged}>
                  Save
                </button>
              </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
