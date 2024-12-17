import React from 'react'
import './Card.css'

const Card = (props) => {
  const universities = props.universities;
  const companies = props.companies;
  return (
    <div className='cardsContainer'>
      <h2>Universities</h2>
      <div className='unisContainer'>
        {universities.map((university, index) => (
          <div
            className="card"
            key={university.userID}
          >
            <img src={university.logo} alt={university.abbreviation} />
            <h4>{university.abbreviation}</h4>
          </div>
        ))}
      </div>
      <h2>Companies</h2>
      <div className='compsContainer'>
          {companies.map((company, index) => (
            <div
              className="card"
              key={company.userID}
            >
                <img src={company.logo} alt={company.linkedIn} />
                <h4>{company.name}</h4>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Card
