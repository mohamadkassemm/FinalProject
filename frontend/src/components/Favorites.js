import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './favorites.css';

const Favorites = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userID = queryParams.get('userid');
  const [favorites, setFavorites] = useState([]);
  const [favoritesDetails, setFavoritesDetails] = useState([]);
  const [names, setNames] = useState({});
  
  const removeFav = async (item, itemType)=>{
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
      // Manually update state to reflect the removal without triggering a fetch
      setFavorites((favorites) => favorites.filter((fav) => fav.item !== item));
      setFavoritesDetails((details) =>
        details.filter((fav) => fav._id !== item)
      )
  }

  useEffect(() => {
    const fetchFavorites = async () => {
        try {
          const { data: favoritesData } = await axios.get(
            `http://localhost:3001/api/v1/student/${userID}/favorites`
          );
          setFavorites(favoritesData.favorites);
        } catch (err) {
          console.error(err.response?.data?.message || 'Error fetching favorites');
        }
      };
    if (userID) {
      fetchFavorites();
    }
  }, [userID]);

  useEffect(() => {
    const fetchFavoritesDetails = async () => {
        try {
          const detailsPromises = favorites.map(async (favorite) => {
            if (favorite.itemType === 'University') {
              const { data: universityDetails } = await axios.get(
                `http://localhost:3001/api/v1/university/${favorite.item}`
              );
              return { ...universityDetails, itemType: 'University' };
            } else if (favorite.itemType === 'Company') {
              const { data: companyDetails } = await axios.get(
                `http://localhost:3001/api/v1/company/${favorite.item}`
              );
              return { ...companyDetails, itemType: 'Company' };
            }
            return null;
          });
          const details = await Promise.all(detailsPromises);
          setFavoritesDetails(details.filter((detail) => detail !== null));
        } catch (err) {
          console.error(err.response?.data?.message || 'Error fetching favorites details');
        }
      };

    if (favorites.length > 0) {
      fetchFavoritesDetails();
    }

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
      favorites.forEach((favorite) => {
        if (!names[favorite.item]) {
          getName(favorite.item);
        }
      });
  }, [favorites, names]);
  return (
    <div className="favsContainer">
      <h2>Favorites</h2>
      <div className="favCardContainer">
        {favoritesDetails.map((favorite) =>  (
          <div className="favCard" key={favorite._id} onClick={() => navigate(`/details/${favorite.itemType}/${favorite._id}?userID=${userID}`)}
          style={{ cursor: "pointer" }}>
            <img
              src={
                favorite.logo ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt={favorite.abbreviation || "No logo found!"}
            />
            <h4>{names[favorite._id] || favorite.abbreviation || "loading name!"}</h4>
            <p>{favorite.description || favorite.abbreviation}</p>
            <button className="favButton" onClick={(e) => {
                    e.stopPropagation();
                    removeFav(favorite._id, favorite.itemType);
                  }}>
                <i
                  className={`fas fa-star ${
                    favorites.some((fav) => fav.item === favorite._id) ? "active" : ""
                  }`}
                />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
