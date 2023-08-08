import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import Been from './Been.jsx';
import SavedPlace from './savedPlaceRow.jsx';

const UserPage = ({ username }) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [savedList, setSavedList] = useState([]);
  const [triedList, setTriedList] = useState([]);

  const getSaved = async () => {
    try {
      //query userRouters/saved with username in body
      const response = await axios.post('/api/savedList', { username });
      //server should return an array of saved places already queried for name
      if (response.status === 200) {
        //check if it's in response.data!!
        setSavedList(response.data.savedList);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getTrys = async () => {
    try {
      //query userRouter/tried with username in body
      const response = await axios.post('/api/beenList', { username });
      //server should return an array of objects
      if (response.status === 200) {
        //check if it's in response.data!
        setTriedList(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSaved();
    getTrys();
  }, []);

  //generate rows for saved list
  const savedRows = savedList.map((savedPlace) => {
    return (
      <tr>
        <td>{savedPlace}</td>
      </tr>
    );
  });
  //generate rows for tried list
  const triedRows = triedList.map((triedPlace) => {
    const name = triedPlace.name;
    const score = triedPlace.score;
    const tags = triedPlace.tags;
    return (
      <tr>
        <td>{name}</td>
        <td>{score}</td>
        <td>{tags}</td>
      </tr>
    );
  });

  // hard coded saved spots
  const savedSpots = [
    'Capital One Cafe',
    'Bean & Bean Chelsea',
    'Gregorys Coffee',
    'Variety Coffee Roasters',
    "King's Street Coffee",
  ];

  const beenTo = [
    {
      locationID: 'Seven Grams Cafe',
      score: 4,
      tags: ['Chill', 'Good Coffee'],
    },
    {
      locationID: 'Intelligentsia Coffee Highline Coffeebar',
      score: 4,
      tags: ['Quiet'],
    },
    {
      locationID: 'Stumptown Coffee Roasters',
      score: 3,
      tags: ['Chill'],
    },
    {
      locationID: 'Gregorys Coffee',
      score: 4,
      tags: ['Outlets'],
    },
    {
      locationID: 'Joe Coffee Company',
      score: 2,
      tags: ['Clean Bathroom'],
    },
  ];

  const beenCards = beenTo.map((el) => {
    return (
      <Been locationID={el.locationID} score={el.score} tags={el.tags}></Been>
    );
  });

  const savedCards = savedSpots.map((el) => {
    return <SavedPlace locationID={el}></SavedPlace>;
  });

  return (
    <div>
      {/* add a button to navigate to the search page */}
      {/* <div className='lists'>
        <div>{beenCards}</div>
        <div>{savedCards}</div>
      </div>
      <div className='searchButton'>
        <button className='button' onClick={() => navigate('/search')}>
          Go to Search Page
        </button>
      </div> */}
      <div className='collapse bg-base-200'>
        <div className='collapse-title text-xl font-medium'>
          Click to open this one and close others
        </div>
        <div className='collapse-content'>
          <p>hello</p>
        </div>
      </div>
      <div className='text-grey-50 underline'>akjsfd</div>
      {/* <div className='collapse bg-base-200'>
        <input type='radio' name='my-accordion-1' />
        <div className='collapse-title text-xl font-medium'>
          Click to open this one and close others
        </div>
        <div className='collapse-content'>
          <p>hello</p>
        </div>
      </div>
      <div className='collapse bg-base-200'>
        <input type='radio' name='my-accordion-1' />
        <div className='collapse-title text-xl font-medium'>
          Click to open this one and close others
        </div>
        <div className='collapse-content'>
          <p>hello</p>
        </div>
      </div> */}
    </div>
  );
};
export default UserPage;
