import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CardDetails.css';

const DetailsPage = ({ items }) => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [item, setItem] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/${type}/${id}`);
        setItem(response.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getItemDetails();
  }, [id, type]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/data/${item?.userID}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    if (item?.userID) {
      fetchUserDetails();
    }
  }, [item.userID]);

  console.log(userData, item);

  return (
    <div className="detailsPage">
      {userData && (
        <div className="itemInfo">
          {/* Back button */}
          <button className="backButton fa fa-arrow-left" onClick={() => navigate(-1)}></button>

          <h1>{userData.name}</h1>
          <img
            src={item.logo || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt={item.abbreviation || item.name}
          />
          <p>Official Website: <a href={item.website}>{item.website}</a></p>
        </div>
      )}

      <div>
        {item.numberOfBranches > 0 && (
          <div className="branchesContent">
            <h3>Number of Branches: {item.numberOfBranches}</h3>
          </div>
        )}

        {item.availableMajors?.length > 0 && (
          <div className="majorContent">
            <h3>Available Majors</h3>
            <ul>
              {item.availableMajors.map((major, index) => (
                <li key={index}>{major}</li>
              ))}
            </ul>
          </div>
        )}

        {item.events?.length > 0 && (
          <div className="eventsContent">
            <h3>Upcoming Events</h3>
            <ul>
              {item.events.map((event, index) => (
                <li key={index}>
                  <strong>{event.name}</strong> - {new Date(event.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
