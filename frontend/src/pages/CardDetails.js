import React from 'react'
import DetailsPage from '../components/CardDetails'
import NavBar from '../components/NavBar'
import Footer from '../components/footer'
import { useLocation } from 'react-router-dom'

const CardDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userID');

  return (
    <div>
        <NavBar userID={userID}/>
        <DetailsPage id/>
        <Footer/>
    </div>
  )
}

export default CardDetailsPage
