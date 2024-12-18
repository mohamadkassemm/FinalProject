import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className='aboutus'>
        <h3>About Us</h3>
        <p>We guide students and graduates in Lebanon toward academic and career success with tailored opportunities in education, internships, and jobs.</p>
      </div>
      <div className='contactus'>
        <h3>Contact</h3>
        <p>Email: support@example.com</p>
        <p>Phone: +123 456 7890</p>
      </div>
    </footer>
  );
};

export default Footer;
