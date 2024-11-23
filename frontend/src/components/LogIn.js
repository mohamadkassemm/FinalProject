import React from 'react';
import { Link } from 'react-router-dom';
import './Forms.css';

const LogIn = () => {
  return (
    <div className='container'>
        <h2>Log In</h2>
        <div className='inputsContainer'>
            <label>Username or Email:</label>
            <input type='text' placeholder='johndoe  johndoe@example.com'/>

            <label>Password:</label>
            <input type='password' placeholder='password'/>

            <p>Forgot password? <Link className='links'>Reset Password</Link></p>

            <input type='submit' value='Login'/>
            <p>Don't have an account? <Link className='links' to='/signup'>Sign Up</Link></p>    
        </div>
    </div>
  )
}

export default LogIn
