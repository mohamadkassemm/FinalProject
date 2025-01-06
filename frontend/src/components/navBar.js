import React, { useState } from 'react';
import './NavBar.css';
import {useNavigate} from 'react-router-dom'


const NavBar = (props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userID = props.userID;
  const toggleMenu = () => {  
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={`navBar ${isOpen ? 'open' : ''}`}>
      <div>
        <p onClick={()=> navigate(`/home?userid=${userID}`)}>961EduWay</p>
      </div>
      <div className='rightNav'>
        <button onClick={()=>navigate(`/companies?userid=${userID}`)}>Companies</button>
        <button onClick={()=>navigate(`/universities?userid=${userID}`)}>Universities</button>
        <button onClick={()=>navigate(`/favorites?userid=${userID}`)}>Favorites</button>
        <button>Profile</button>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </div>
  );
};

export default NavBar;
