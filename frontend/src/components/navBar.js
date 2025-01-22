import React, { useEffect, useState } from 'react';
import './NavBar.css';
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';


const NavBar = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  const toggleMenu = () => {  
    setIsOpen(prevState => !prevState);
  };
  const [role, setRole] = useState('');
 useEffect(()=>{
  const fetchUserType = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');
      if(userID){
        const response = await axios.get(
          `http://localhost:3001/api/v1/user/role/${userID}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response)
        const roleData = response.data.role.toLowerCase();
        setRole(roleData);
      }
    } catch (error) {
      console.error('Error fetching user role:', error.message);
    }
  };

  fetchUserType();

 },[userID])
  

  const handleLogout = async()=>{
    try{
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#c9543a',
        cancelButtonColor: '#647060',
        confirmButtonText: 'Yes, log out!',
    });

    if (result.isConfirmed) {
        const response = await axios.post(`http://localhost:3001/api/v1/user/logout/${userID}`);
        if (response.status === 200) {
            Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
            navigate('/login');
        }
    }
    }catch(err){
      console.error("Try again,", err.message)
    }
  }
  return (
    <div className={`navBar ${isOpen ? 'open' : ''}`}>
      <div>
        <p onClick={()=> navigate(`/home?userid=${userID}`)}>961EduWay</p>
      </div>
      <div className='rightNav'>
        {role && role!=='student' && (<button onClick={()=>navigate(`/students?userid=${userID}`)}>Students</button>)}
        <button onClick={()=>navigate(`/companies?userid=${userID}`)}>Companies</button>
        <button onClick={()=>navigate(`/universities?userid=${userID}`)}>Universities</button>
        <button onClick={()=>navigate(`/favorites?userid=${userID}`)}>Favorites</button>
        <button onClick={()=>navigate(`/profile?userid=${userID}`)}>Profile</button>
        <button className='fa fa-sign-out-alt' onClick={()=>{handleLogout()}}></button>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </div>
  );
};

export default NavBar;