import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './Forms.css';

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.usernameOrEmail || !formData.password) {
      setError('Please enter both username/email and password');
      setOpenSnackbar(true)
      setSuccess('');
    }
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });

      setSuccess(response.data.message);
      setError('');
      setSnackbarType('success');
      setOpenSnackbar(true);

      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/completeProfile');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      setSuccess('');
      setSnackbarType('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          <p>
            Don't have an account?{' '}
            <Link className="links" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>

      {/* Snackbar Component */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarType === 'success' ? success : error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LogIn;
