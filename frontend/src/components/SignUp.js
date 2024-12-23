import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/signup', {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role.toLowerCase(),
      });

      setSuccess(response.data.message);
      setError('');
      formData.name=""
      formData.email=""
      formData.username=""
      formData.password=""
      formData.confirmPassword=""
      formData.role=""
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="body">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} className="inputsContainer">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com" />

          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="johndoe" />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Use strong password" />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Retype the password" />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option hidden>Role</option>
            <option>Student</option>
            <option>University</option>
            <option>Company</option>
          </select>

          <input type="submit" value="Sign Up" />
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <p>Already have an account? <Link className="links" to="/login">Log In</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
