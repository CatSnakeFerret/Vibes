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
    // getSaved();
    // getTrys();
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

  const beenCards = beenTo.map((el, idx) => {
    return (
      <Been
        locationID={el.locationID}
        score={el.score}
        tags={el.tags}
        idx={idx}
      ></Been>
    );
  });

  const savedCards = savedSpots.map((el) => {
    return <SavedPlace locationID={el}></SavedPlace>;
  });

  return (
    <div>
      {/* add a button to navigate to the search page */}
      <h1 className='flex text-5xl justify-center'>VIBE</h1>
      {/* <div className='text-red-900 text-lg'>
        <div>BEEN TO</div>
        <div>{beenCards}</div>
      </div>
      <br></br>
      <div>{savedCards}</div> */}

      <div className='bg-gray-100 flex justify-center items-center min-h-screen'>
        <div className='bg-white text-black p-8 shadown-lg rounded-xl w-[600px] max-w-full'>
          <h1 className='text-3xl font-bold text-center'>
            The Barebones of an Accordion
          </h1>
          <p className='text-center my-4 max-w-md mx-auto'>
            Highlighting inportant detail of a section and reealing more detail
            upon a tap or a click, if necessary
          </p>

          <div>
            <div className='accordion-item cursor-pointer'>
              <div className='p-2 text-xl'>When and how it should be used?</div>
              <div className='p-2 hidden toggle'>
                The accordion is a graphical control element conprising a
                vertically stacked list of items, such as labels or thumbnails{' '}
                <br /> <br />
                An accordion is similar inpjurpose to a tabbed interface, a list
                of items where exactly oe item is expanded into a panel.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='searchButton'>
        <button className='button' onClick={() => navigate('/search')}>
          Go to Search Page
        </button>
      </div>
    </div>
  );
};
export default UserPage;
