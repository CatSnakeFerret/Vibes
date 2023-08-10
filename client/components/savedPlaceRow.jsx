import React, { useState } from 'react';
import Rate from './Rate.jsx';

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
  } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className='flex space-x-10' onClick={() => setIsActive(!isActive)}>
        <div>
          {isActive ? '-' : '+'} {idx + 1} {place_name}
        </div>
      </div>
      {isActive && (
        <div>
          <div className='space-x-1 text-sm flex'>
            <div>{address} |</div>
            <div> {zip} |</div>
            <div> {telephone !== 'N/A' ? telephone : 'no phone'}</div>
          </div>
          <div className='space-x-1 text-sm flex'>
            <div>{neighborhood} |</div>
            <div> Category: {category} |</div>
            <Rate place_id={place_id} clickFn={clickFn}></Rate>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPlace;
