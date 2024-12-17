import React from 'react';
import './Hero.css';
import Card from './Card';
import { useState } from 'react';
import { useEffect } from 'react';

const Hero = () => {
  const [universities, setUniversities] = useState([]);
  const [companies, setCompanies] = useState([]);
  
  useEffect(() => {
    // Fetch universities data
    fetch('https://example.com/api/universities') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setUniversities(data))
      .catch(error => console.error('Error fetching universities:', error));
    
    // Fetch companies data
    fetch('https://example.com/api/companies') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []); // Empty dependency array ensures this runs once when the component mounts
  
  return (
    <div>
      <div className="heroContainer">
        <div className='heroText'>
        <h1>Welcome to 961EduWay</h1>
          <p>
            A platform designed to guide students and fresh graduates in Lebanon. Whether you're a terminal student,
            a fresh bachelor's graduate, or a master's/Ph.D. holder, we provide personalized recommendations for majors,
            bootcamps, internships, jobs, and university opportunities. Our goal is to light the pathway to your career
            and academic success.
          </p>
        </div>
      </div>
      <div className='everything'>
        <Card universities={universities} companies={companies}/>
      </div>
    </div>
  );
};

export default Hero;
