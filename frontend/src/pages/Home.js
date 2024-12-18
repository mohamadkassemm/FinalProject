import React from 'react';
import '../index.css'
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import Footer from '../components/footer';

const HomePage = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default HomePage;
