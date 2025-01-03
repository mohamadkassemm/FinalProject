import React, {useEffect, useState} from 'react';
import './Hero.css';
import Card from './Card';
import axios from 'axios';

const Hero = (props) => {
  const [universities, setUniversities] = useState([]);
  const [companies, setCompanies] = useState([]);
  const studentId= props.studentId;
  
  useEffect(() => {
    // Fetch universities data
    axios
      .get('http://localhost:3001/api/v1/university')
      .then(response => setUniversities(response.data))
      .catch(error => console.error('Error fetching universities:', error));
    
    // Fetch companies data
    axios
    .get('http://localhost:3001/api/v1/company') 
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []); 
  
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
      <div className='content'>
        <Card universities={universities} companies={companies} studentId={studentId}/>
      </div>
    </div>
  );
};

export default Hero;
