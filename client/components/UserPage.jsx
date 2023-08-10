import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import Been from './Been.jsx';
import SavedPlace from './savedPlaceRow.jsx';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

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
      // console.log('lo÷ok here');
      //query userRouter/tried with username in body
      const response = await axios.post('/api/beenList', { username });
      //server should return an array of objects
      if (response.status === 200) {
        //check if it's in response.data!
        setTriedList(response.data.beenList);
        // console.log('HELLO', response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getSaved();
      getTrys();
      // location.reload();
    }, 1000);

    // getSaved();
    // getTrys();
  }, [savedList]);

  const clickFn = () => location.reload();

  const initalRateHandler = async () => {
    try {
      // console.log('THE PLACE IS' + place_id)
      const result = await axios.post('api/getRating', {
        place: props.place_id,
      });
      setRating(result.data.rating);
    } catch (error) {
      console.log(error);
    }
  };

  const beenCards = triedList.map((el, idx) => {
    return (
      <Been
        idx={idx}
        rating={el.rating}
        place_id={el.place_id}
        address={el.address}
        category={el.category}
        neighborhood={el.neighborhood}
        place_name={el.place_name}
        telephone={el.telephone}
        zip={el.zip}
        clickFn={clickFn}
        initalRateHandler={initalRateHandler}
      ></Been>
    );
  });

  const savedCards = savedList.map((el, idx) => {
    return (
      <SavedPlace
        place_id={el.place_id}
        address={el.address}
        category={el.category}
        neighborhood={el.neighborhood}
        place_name={el.place_name}
        telephone={el.telephone}
        zip={el.zip}
        idx={idx}
        clickFn={clickFn}
        initalRateHandler={() => console.log('still doin nothin')}
      ></SavedPlace>
    );
  });

  // console.log(triedList);
  return (
    <div>
      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
      <div className='searchButton'>
        <button className='button' onClick={() => navigate('/search')}>
          Go to Search Page
        </button>
      </div>
      {/* add a button to navigate to the search page */}
      <h1 className='flex text-5xl justify-center'>VIBE</h1>
      <div className='text-blue-900 text-lg'>
        <div>BEEN TO</div>
        <div>{beenCards}</div>
      </div>
      <br></br>
      <div className='text-blue-900 text-lg'>
        <div>WISHLIST</div>
        <div>{savedCards}</div>
      </div>

      {/* <div className='bg-gray-100 flex justify-center items-center min-h-screen'>
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
      </div> */}
    </div>
  );
};
export default UserPage;
