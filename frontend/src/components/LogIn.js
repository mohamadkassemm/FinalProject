import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });

      setSuccess(response.data.message);
      setError('');
      
      navigate('/completeProfile');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setSuccess('');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="inputsContainer">
          <label>Username or Email:</label>
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            placeholder="johndoe@example.com"
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />

          <p>
            Forgot password?{' '}
            <Link className="links" to="/resetPassword">
              Reset Password
            </Link>
          </p>

          <input type="submit" value="Login" />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <p>
            Don't have an account?{' '}
            <Link className="links" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
