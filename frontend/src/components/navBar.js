import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className={`navBar ${isOpen ? 'open' : ''}`}>
      <div>
        <button>961EduWay</button> {/* Brand name, should ideally redirect to homepage */}
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
