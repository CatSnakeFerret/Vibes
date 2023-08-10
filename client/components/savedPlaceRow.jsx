import React, { useState } from 'react';
import Rate from './Rate.jsx';
import axios from 'axios';

const SavedPlace = (props) => {
  const {
    address,
    category,
    neighborhood,
    place_id,
    place_name,
    telephone,
    zip,
    idx,
    clickFn,
    deleteHandler,
  } = props;

  const [isActive, setIsActive] = useState(false);

  const emoji = (cat) => {
    if (cat === 'Cafe') {
      return '☕️';
    } else if (cat === 'Brewery') {
      return '🍺';
    } else if (cat === 'Park') {
      return '🌿🍃';
    } else if (cat === 'Library') {
      return '📚';
    }
  };

  return (
    <div className='m-2'>
      <div className='card w-72 h-72 bg-yellow-100 shadow-xl text-green-900'>
        <div className='card-body p-3'>
          <h2 className='card-title text-lg justify-center'>{place_name}</h2>
          <div className='space-x-1 text-sm flex justify-center '>
            <div>{address} |</div>
            <div>{neighborhood}</div>
          </div>
          <div className='space-x-1 text-sm flex justify-center'>
            <div> {category} |</div>
            <Rate place_id={place_id} clickFn={clickFn}></Rate>
          </div>
          <br></br>
          <div className='text-7xl flex justify-center bottom-0'>
            <div>{emoji(category)}</div>
          </div>
          {/* <div className='card-actions justify-end'>
            <button className='btn btn-primary'>Buy Now</button>
          </div> */}
          <button className='btn' onClick={() => deleteHandler(place_id)}>
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedPlace;
