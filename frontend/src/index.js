import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import HomePage from './pages/Home';
import ResetPassPage from './pages/ResetPassword';
import CompleteProfilePage from './components/CompleteProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/resetPassword" element={<ResetPassPage/>} />
        <Route path="/completeProfile" element={<CompleteProfilePage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
