import React from 'react';
import '../index.css'
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const { studentId } = location.state || {};
  return (
    <div>
      <NavBar/>
      <Hero studentId={studentId}/>
      <Footer/>
    </div>
  )
}

export default HomePage;
