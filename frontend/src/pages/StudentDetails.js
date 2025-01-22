import React from 'react'
import { useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import StudentDetails from '../components/StudentDetails'
import Footer from '../components/footer'

const StudentDetailsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userID = queryParams.get('userid');
  return (
    <div>
        <NavBar userID={userID}/>
        <StudentDetails userID={userID}/>
        <Footer />
    </div>
  )
}

export default StudentDetailsPage
