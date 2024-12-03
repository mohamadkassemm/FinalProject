import React from 'react';
import { Link } from 'react-router-dom';
import './Forms.css';

const SignUp = () => {
  return (
    <div className='body'>
      <div className='container'>
          <h2>Sign Up</h2>
          <div className='inputsContainer'>
              <label>Name:</label>
              <input type='text' placeholder='John Doe'/>
              
              <label>Email:</label>
              <input type='email' placeholder='johndoe@example.com'/>
              
              <label>Username:</label>
              <input type='text' id='username' placeholder='johndoe'/>
              
              <label>Password:</label>
              <input type='password' placeholder='use strong password'/>
              
              <label>Confirm Password:</label>
              <input type='password' placeholder='retype the password'/>

              <label>Role:</label>
              <select>
                  <option hidden>Role</option>
                  <option>Student</option>
                  <option>University</option>
                  <option>Company</option>
              </select>

              <input type='submit' value='Sign Up'/> 
              <p>Already have an account? <Link className='links' to='/login'>Log In</Link></p> 
          </div>
      </div>
    </div>
  )
}

export default SignUp
