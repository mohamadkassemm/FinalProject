import React from 'react'
import NavBar from '../components/NavBar';
import Favorites from '../components/Favorites';
import Footer from '../components/footer';
import { useLocation } from 'react-router-dom';

const FavoritesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  return (
    <div>
      <NavBar userID={userID}/>
      <Favorites/>
      <Footer/>
    </div>
  )
}

export default FavoritesPage