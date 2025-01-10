import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [roleID, setRoleID] = useState('');
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState({});
  const [activeTab, setActiveTab] = useState('personal'); // State to manage active tab
  const [userRoleData, setUserRoleData] = useState({})
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  // Fetch token from localStorage
  const token = localStorage.getItem('token');

  // Fetch user name
  useEffect(() => {

    const getRoleID = async(id)=>{
        try{
            const response = await axios.get(`http://localhost:3001/api/v1/${userData.role}/ID/${id}`,  {
                headers: { Authorization: `Bearer ${token}` },
              })
              setRoleID(response.data)
        }catch(err){
            console.log("error getting ID:", err.message)
        }
    }

    const getData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/data/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.name);
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    const getUserRoleData = async (roleID) => {
        try{
            const response = await axios.get(`http://localhost:3001/api/v1/${userData.role}/${roleID}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            setUserRoleData(response.data)
        }catch(error){
            console.error('Error fetching user name:', error);
        }
    }

    const fetchUserDetails = async (id) => {
        try {
          // Wait for getData to complete
          await getData(id);
    
          // After getUserRoleData completes, call getRoleID
          await getRoleID(id);

          // After getData completes, call getUserRoleData
          await getUserRoleData(roleID);
    
          
    
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

    if (userID) {
      fetchUserDetails(userID);
    }
  }, [userID, token, userData, userRoleData, roleID]);

  // Handle tab click
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
          <li
            className={activeTab === 'logout' ? 'active' : ''}
            onClick={() => handleTabClick('logout')}
          >
            Log Out
          </li>
        </ul>
      </div>

      <div className="profileContent">
        <h2>Hello {userName}</h2>
        {activeTab === 'personal' && (
          <div>
            <h2>Personal Details</h2>
            {userData.role === "student" && (
                <div>
                    <h2>Personal Details</h2>
                    <p>Full Name: {userData.name}</p>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Joined at: {userData.createdAt}</p>
                </div>
                )}

            {userData.role === "university" && (
                <div>
                    <h2>University Details</h2>
                    <p>Name: {userData.name}</p>
                    <p>Established Year: {userData.establishedYear}</p>
                    <p>Contact Email: {userData.contactEmail}</p>
                    <p>Location: {userData.location}</p>
                </div>
                )}

            {userData.role === "company" && (
                <div>
                    <h2>Company Details</h2>
                    <p>Company Name: {userData.companyName}</p>
                    <p>Contact Person: {userData.contactPerson}</p>
                    <p>Contact Number: {userData.contactNumber}</p>
                    <p>Email: {userData.email}</p>
                </div>
                )}
          </div>
        )}

        {activeTab === 'educational' && (
          <div>
            <h2>Educational Details</h2>
            <p>Here are the user's educational details...</p>
          </div>
        )}

        {activeTab === 'logout' && (
          <div>
            <h2>Log Out</h2>
            <p>You have been logged out.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
