import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = (props) => {
  const navigate = useNavigate();
  const { universities, companies, userID } = props;
  const [favorites, setFavorites] = useState([  ]);
  const [names, setNames] = useState({});
  const toggleFav = async (item, itemType) => {
    try {
      // Check if the item is already a favorite
      const isFavorite = favorites.some(
        (fav) => fav.item=== item && fav.itemType === itemType
      );
      if (!isFavorite) {
        const response = await axios.post(
          `http://localhost:3001/api/v1/student/${userID}/favorites`,
          {
            item,
            itemType,
          }
        );
  
        console.log(response.data.message); // "Favorite added successfully"
        setFavorites((prevFavorites) => [...prevFavorites, { item, itemType }]); 
      } else {
        const response = await axios.delete(
          `http://localhost:3001/api/v1/student/${userID}/favorites`,
          {
            params: {
              item,
              itemType,
            },
          }
        );
        
        console.log(response.data.message); // "Favorite removed successfully"
        setFavorites((favorites) => favorites.filter((fav) => fav.item !== item)); // Update state
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

    const fetchFavorites = async () => {
      try {
        const { data: currentFavorites } = await axios.get(
          `http://localhost:3001/api/v1/student/${userID}/favorites`
        );
        setFavorites(currentFavorites.favorites);
      } catch (err) {
        console.error(err.response?.data?.message || "Error fetching favorites");
      }
    };

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

    fetchFavorites();
  }, [universities, companies, names, userID]);

  return (
    <div className="cardsContainer">
      {universities.length > 0 && (
        <>
          <h2>Universities</h2>
          <div className="unisContainer">
            {universities.map((university) => (
              <div className="card" key={university.userID} onClick={() => navigate(`/details/university/${university._id}?userID=${userID}`)}
              style={{ cursor: "pointer" }} >
                <img 
                  src={university.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={university.abbreviation} 
                />
                <h4>{names[university._id] || "Loading..."}</h4>
                 
                <button className="starButton" onClick={(e) =>{e.stopPropagation(); toggleFav(university._id, "University")}}>
                <i
                  className={`fas fa-star ${
                    favorites.some((fav) => fav.item === university._id && fav.itemType === "University")
                      ? "active"
                      : ""
                  }`}
                ></i>
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
              <div className="card" key={company.userID} onClick={() => navigate(`/details/company/${company._id}?userID=${userID}`)}
              style={{ cursor: "pointer" }} >
                <img 
                  src={company.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={company.linkedIn} 
                />
                <h4>{names[company._id] || "loading..."}</h4>
                <button className="starButton" onClick={(e) =>{e.stopPropagation(); toggleFav(company._id, "Company")}}>
                <i
                  className={`fas fa-star ${
                    favorites.some((fav) => fav.item === company._id && fav.itemType === "Company")
                      ? "active"
                      : ""
                  }`}
                ></i>
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
