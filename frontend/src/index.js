import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import SignUpPage from './pages/SignUp';
import LogInPage from './pages/LogIn';
import HomePage from './pages/Home';
import ResetPassPage from './pages/ResetPassword';
import CompleteProfilePage from './pages/CompleteProfile';
import FavoritesPage from './pages/Favorites';
import CompaniesPage from './pages/Companies';
import UniversitiesPage from './pages/University'
import ProfilePage from './pages/Profile'
import CardDetailsPage from './pages/CardDetails';

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
        <Route path="/favorites" element={<FavoritesPage/>} />
        <Route path="/companies" element={<CompaniesPage/>} />
        <Route path='/universities' element={<UniversitiesPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/details/:type/:id' element={<CardDetailsPage/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
