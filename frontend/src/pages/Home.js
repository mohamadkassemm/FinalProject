import React from 'react';
import '../index.css'
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  console.log(token)
  return (
    <div>
      <NavBar userID={userID}/>
      <Hero userID={userID}/>
      <Footer/>
    </div>
  )
}

export default HomePage;
