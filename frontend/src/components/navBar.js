import React, { useState } from 'react';
import './NavBar.css';
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoHandler = ()=>{
    navigate("/home")
  };

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={`navBar ${isOpen ? 'open' : ''}`}>
      <div>
        <p onClick={logoHandler}>961EduWay</p>
      </div>
      <div className='rightNav'>
        <button>Companies</button>
        <button>Universities</button>
        <button>Favorites</button>
        <button>Profile</button>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
    </div>
  );
};

export default NavBar;
