import React from 'react'
import NavBar from '../components/NavBar';
import Companies from '../components/Companies';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const CompaniesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  return (
    <div>
      <NavBar userID={userID}/>
      <Companies />
      <Footer/>
    </div>
  )
}

export default CompaniesPage