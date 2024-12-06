import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navBar'>
      <div>
        <button>961EduWay</button>
      </div>
      <div className='rightNav'>
        <button>Companies</button>  
        <button>Universities</button>
        <button>Favorites</button>
        <button>Profile</button>
      </div>
    </div>
  )
}

export default NavBar;
