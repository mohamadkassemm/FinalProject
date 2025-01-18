import React, { useState } from 'react';
import './NavBar.css';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios';


const NavBar = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userID = props.userID;
  const toggleMenu = () => {  
    setIsOpen(prevState => !prevState);
  };

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
        <button onClick={()=>navigate(`/students?userid=${userID}`)}>Students</button>
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