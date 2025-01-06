import React from 'react'
import NavBar from '../components/NavBar';
import University from '../components/Universities';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const CompaniesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  return (
    <div>
      <NavBar userID={userID}/>
      <University />
      <Footer/>
    </div>
  )
}

export default CompaniesPage