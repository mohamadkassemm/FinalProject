import React from 'react'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'

const ProfilePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userID = queryParams.get('userid');
  return (
    <div>
        <NavBar userID={userID}/>
        <Profile userID={userID}/>
        <Footer/>
    </div>
  )
}

export default ProfilePage
