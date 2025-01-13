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
  const [majorNames, setMajorNames] = useState([]);
  const [showMajorForm, setShowMajorForm] = useState(false);
  const [majorData, setMajorData] = useState({
    name: '',
    description: '',
    courseCount: '',
    totalCost: '',
    studentCount: '',
    nbOfSemester: '',
  });

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

  const handleMajorSubmit = async (majorData) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/major', majorData);
      console.log('Major successfully submitted:', response.data);
      setShowMajorForm(false);
    } catch (error) {
      console.error('Error submitting major:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMajorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  // Function to handle adding a new major
  const handleAddMajor = () => {
    setShowMajorForm(true);
  };

  // Function to handle adding a new position
  const handleAddPosition = () => {
    console.log('Add Position button clicked');
  };

  console.log(userData, item);

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
            <h3>
              Available Majors: 
              <button className="addButton" onClick={handleAddMajor}>+ Add</button>
            </h3>
            <ul className="majorList">
              {majorNames.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>

            {showMajorForm && (
              <div className="formContainer">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleMajorSubmit(majorData);
                  }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter major name"
                    value={majorData.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={majorData.description}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="courseCount"
                    placeholder="Enter course count"
                    value={majorData.courseCount}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="totalCost"
                    placeholder="Enter total cost"
                    value={majorData.totalCost}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="studentCount"
                    placeholder="Enter student count"
                    value={majorData.studentCount}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="nbOfSemester"
                    placeholder="Enter number of semesters"
                    value={majorData.nbOfSemester}
                    onChange={handleInputChange}
                  />
                  <button type="submit">Submit Major</button>
                  <button type="button" onClick={() => setShowMajorForm(false)}>Cancel</button>
                </form>
              </div>
            )}
          </div>
        )}

        {item?.availablePositions?.length > 0 && (
          <div className="positionContent">
            <h3>
              Available Positions: 
              <button className="addButton" onClick={handleAddPosition}>+ Add</button>
            </h3>
            <ul className="majorList">
              {item.availablePositions.map((pos, index) => (
                <li key={index}>{pos}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
