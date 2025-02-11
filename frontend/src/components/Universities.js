import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Universities.css'

const Universities = () => {
    const navigate=useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userID = queryParams.get('userid');
    const [universities, setUniversities] = useState([]);
    const [names, setNames] = useState({});
    const [role, setRole] = useState('');
    const [favorites, setFavorites] = useState([  ]);

    const toggleFav = async (item, itemType) => {
        try {
          // Check if the item is already a favorite
          const isFavorite = favorites?.some(
            (fav) => fav.item=== item && fav.itemType === itemType
          );
          if (!isFavorite) {
            const response = await axios.post(
              `http://localhost:3001/api/v1/${role}/${userID}/favorites`,
              {
                item,
                itemType,
              }
            );
      
            console.log(response.data.message); // "Favorite added successfully"
            setFavorites((prevFavorites) => [...prevFavorites, { item, itemType }]); 
          } else {
            const response = await axios.delete(
              `http://localhost:3001/api/v1/${role}/${userID}/favorites`,
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
      const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const fetchUserType = async ()=>{
          const response = await axios.get(`http://localhost:3001/api/v1/user/role/${userID}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const roleData = response.data.role.toLowerCase();
          setRole(roleData);
        }
        fetchUserType();
        if(role){
          const fetchFavorites = async () => {
            try {
              const { data: currentFavorites } = await axios.get(
                `http://localhost:3001/api/v1/${role}/${userID}/favorites`
              );
              setFavorites(currentFavorites.favorites);
            } catch (err) {
              console.error(err.response?.data?.message || "Error fetching favorites");
            }
          };

          fetchFavorites();
        }
        

          axios
          .get('http://localhost:3001/api/v1/university')
          .then(response => setUniversities(response.data))
          .catch(error => console.error('Error fetching universities:', error));

          universities.forEach((university) => {
            if (!names[university._id]) {
              getName(university._id);
            }
          });    

      }, [universities, names, userID, role]);

  return (
    <div className='universitiesContainer'>
        <h2>Universities</h2>
        {universities.length > 0 && (
        <>
          <div className="unisContainer">
            {universities.map((university) => (
              <div className="uniCard" key={university.userID} onClick={() => navigate(`/details/university/${university._id}?userid=${userID}`)}
              style={{ cursor: "pointer" }}>
                <img 
                  src={university.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                  alt={university.linkedIn} 
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
                  }} 
                />
                <h4>{names[university._id] || "loading..."}</h4>
                <button className="starButton" onClick={(e) =>{
                  e.stopPropagation();
                  toggleFav(university._id, "University")}}>
                <i
                  className={`fas fa-star ${
                    favorites?.some((fav) => fav.item === university._id && fav.itemType === "University")
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
  )
}

export default Universities
