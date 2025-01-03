import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';

const Card = (props) => {
  const { universities, companies, studentId } = props;
  const [favorites, setFavorites] = useState({});
  const [names, setNames] = useState({});

  const toggleFav = async (itemID, itemType) => {
    try {
      // Get current favorites (if needed)
      const { data: currentFavorites } = await axios.get(
        `http://localhost:3001/api/v1/student/${studentId}/favorites`
      );
  
      // Check if the item is already a favorite
      const isFavorite = currentFavorites.some(
        (fav) => fav.itemID === itemID && fav.itemType === itemType
      );
  
      // Add or remove the favorite
      if (!isFavorite) {
        const response = await axios.post(
          `http://localhost:3001/api/v1/student/${studentId}/favorites`,
          {
            itemID,
            itemType,
          }
        );
  
        console.log(response.data.message); // "Favorite added successfully"
        setFavorites((prev) => [...prev, { itemID, itemType }]); // Update state
      } else {
        const response = await axios.delete(
          `http://localhost:3001/api/v1/student/${studentId}/favorites/${itemID}`
        );
  
        console.log(response.data.message); // "Favorite removed successfully"
        setFavorites((prev) => prev.filter((fav) => fav.itemID !== itemID)); // Update state
      }
    } catch (err) {
      console.error(err.response?.data?.message || "Error toggling favorite");
    }
  };
  

  async function getName(id) {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/user/getName/${id}`);
      const name = response.data.name;
      setNames((prevNames) => ({
        ...prevNames,
        [id]: name,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    universities.forEach((university) => {
      if (!names[university._id]) {
        getName(university._id);
      }
    });

    companies.forEach((company)=>{
      if(!names[company._id]){
        getName(company._id);
      }
    })
  }, [universities, companies, names]);

  return (
    <div className="cardsContainer">
      {universities.length > 0 && (
        <>
          <h2>Universities</h2>
          <div className="unisContainer">
            {universities.map((university) => (
              <div className="card" key={university.userID}>
                <img 
                  src={university.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={university.abbreviation} 
                />
                <h4>{names[university._id] || "Loading..."}</h4>
  {/* const toggleFav = async (studentID, itemID, itemType) => { */}
                
                <button className="starButton" onClick={() => toggleFav(university._id, "university")}>
                  <i className={`fas fa-star ${favorites[university.userID] ? 'active' : ''}`}></i>
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {companies.length > 0 && (
        <>
          <h2>Companies</h2>
          <div className="compsContainer">
            {companies.map((company) => (
              <div className="card" key={company.userID}>
                <img 
                  src={company.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={company.linkedIn} 
                />
                <h4>{names[company._id] || "loading..."}</h4>
                <button className="starButton" onClick={() => toggleFav(company.userID, "company")}>
                  <i className={`fas fa-star ${favorites[company.userID] ? 'active' : ''}`}></i>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
