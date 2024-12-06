import React from 'react';
import './Hero.css';

const universities = [
  {
    id: 1,
    name: 'Lebanese University',
    description:
      'The Lebanese University (LU; Arabic: الجامعة اللبنانية) is the only state-funded public university in Lebanon. It was established in 1951. The university\'s main campus was originally located in Beirut, but a few satellite campuses were opened due to travel restrictions during the Lebanese Civil War. It has three geographically distributed campuses: Rafic Hariri Campus, Fanar Campus and North Campus. The university currently enrolls thousands of students and is organized into 16 faculties. It offers a range of degree programs, include undergraduate, graduate and doctoral levels. The primary language of instruction is Arabic.',
    image: 'https://www.crwflags.com/fotw/images/l/lb_lu.gif',
  },
  {
    id: 2,
    name: 'Lebanese American University',
    description:
      'The Lebanese American University (LAU; Arabic: الجامعة اللبنانية الأميركية) is a secular private American university with campuses in Beirut, Byblos, and New York. It is chartered by the board of regents of the University of the State of New York and is accredited by the New England Commission of Higher Education (NECHE). It has two campuses and offers 33 bachelor\'s degree programs and 24 master\'s degree programs in addition to Pharm.D. and M.D. degrees.',
    image: 'https://iconape.com/wp-content/files/bu/191544/gif/lebanese-american-university-logo.gif',
  },
  {
    id: 3,
    name: 'Islamic University of Lebanon',
    description:
      'IUL is a non-profit private institution affiliated to the Supreme Islamic Shiite Council established by Law no. 72/67, and granted educational, administrative and financial autonomy. Initiated by the desire of Imam Sayyed Moussa EL-SADER, IUL was established with the dual aim of promoting the culture of higher education to the most deprived and disadvantaged members of the society and providing enhanced proximity and collaborative innovation to meet the future demands thereof.',
    image: 'https://www.nooreed.com/images/universities/islamic-uni-of-lebanon-logo2022-02-24-04-03-56.png',
  },
];

const Hero = () => {
  return (
    <div className="heroContainer">
      {universities.map((university, index) => (
        <div
          className="imageDescription"
          key={university.id}
        >
          {index % 2 === 0 ? (
            <>
              <img src={university.image} alt={university.name} />
              <p>{university.description}</p>
            </>
          ) : (
            <>
              <p>{university.description}</p>
              <img src={university.image} alt={university.name} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Hero;
