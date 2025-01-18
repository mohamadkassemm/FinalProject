import React from 'react'
import NavBar from '../components/NavBar';
import Students from '../components/students';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const StudentsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  return (
    <div>
      <NavBar userID={userID}/>
      <Students />
      <Footer/>
    </div>
  )
}

export default StudentsPage