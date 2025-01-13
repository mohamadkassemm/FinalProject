import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MajorDetails from './MajorDetails';
import './CardDetails.css';

const DetailsPage = ({ items }) => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const [item, setItem] = useState({});
  const [userData, setUserData] = useState({});
  const [majorNames, setMajorNames] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null); // For showing MajorDetails modal

  // Fetch major names
  const fetchMajorName = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/major/${id}`);
      return response?.data || 'Unknown Major';
    } catch (error) {
      console.error(`Error fetching major name for ID ${id}:`, error);
      return 'Unknown Major';
    }
  };

  // Fetch item details
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

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/user/data/${item?.userID}`);
        if (response) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    if (item?.userID) {
      fetchUserDetails();
    }
  }, [item.userID]);

  // Fetch all available majors
  useEffect(() => {
    const fetchMajors = async () => {
      if (item?.availableMajors?.length > 0) {
        const names = await Promise.all(item.availableMajors.map(fetchMajorName));
        setMajorNames(names);
      }
    };
    fetchMajors();
  }, [item.availableMajors]);

  // Handle click on a major to show details
  const handleMajorClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/major/details/${id}`);
      setSelectedMajor(response.data);
    } catch (error) {
      console.error('Error fetching major details:', error);
    }
  };

  // Close the MajorDetails modal
  const handleCloseModal = () => {
    setSelectedMajor(null);
  };

  return (
    <div className="detailsPage">
      {userData && (
        <div className="itemInfo">
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
        {item?.numberOfBranches > 0 && (
          <div className="branchesContent">
            <h3>Number of Branches: {item.numberOfBranches}</h3>
          </div>
        )}

        {majorNames.length > 0 && (
          <div className="majorContent">
            <h3>Available Majors:</h3>
            <ul className="majorList">
              {majorNames.map((name, index) => (
                <li key={index}>
                  <button onClick={() => handleMajorClick(item.availableMajors[index])}>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item?.availablePositions?.length > 0 && (
          <div className="positionContent">
            <h3>Available Positions:</h3>
            <ul className="majorList">
              {item.availablePositions.map((pos, index) => (
                <li key={index}>{pos}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* MajorDetails Modal */}
      {selectedMajor && (
        <MajorDetails course={selectedMajor} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default DetailsPage;
