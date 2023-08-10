import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import Been from './Been.jsx';
import SavedPlace from './savedPlaceRow.jsx';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

const UserPage = ({ username }) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [savedList, setSavedList] = useState([]);
  const [beenList, setBeenList] = useState([]);

  const getSaved = async () => {
    try {
      //query userRouters/saved with username in body
      const response = await axios.post('/api/savedList', { username });
      //server should return an array of saved places already queried for name
      if (response.status === 200) {
        //check if it's in response.data and reset savedList
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
        //check if it's in response.data and reset beenList
        setBeenList(response.data.beenList);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // on initial load, query and set from db savedList and beenList
  useEffect(() => {
    // setTimeout(() => {
    //     getSaved();
    //     getTrys();
    //     // location.reload();
    //   }, 1000);

    getSaved();
    getTrys();
  }, []);

  const deleteHandler = async (place_id) => {
    try {
      const result = await axios.post('api/deletePlace', { place: place_id });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const clickFn = () => location.reload(); // helper function to hard reload on new rating set (NOT IN USE)

  // iterate through the beenList and map into Been components passing down the schema properties (INCL RATINGS)
  const beenCards = beenList
    .sort((a, b) => b.rating - b.rating)
    .map((el, idx) => {
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
          deleteHandler={deleteHandler}
        ></Been>
      );
    });

  // iterate through the savedList and map into Been components passing down the schema properties
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
        key={idx}
        clickFn={clickFn}
        deleteHandler={deleteHandler}
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
      <h1 className='flex text-5xl justify-center mb-10'>🍹 ISSA VIBE 🌴</h1>
      <h2 className='flex text-3xl justify-center mb-1 bg-red-100'>BEEN TO</h2>
      <div className='text-blue-900 text-lg flex justify-center'>
        <div className='flex flex-wrap justify-center'>{beenCards}</div>
      </div>
      <br></br>
      <h2 className='flex text-3xl justify-center mb-1 bg-red-100'>WISHLIST</h2>
      <div className='text-blue-900 text-lg'>
        <div className='flex flex-wrap justify-center'>{savedCards}</div>
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
