import React, { useState } from 'react';

const Been = (props) => {
  const { locationID, score, tags, idx } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className='flex space-x-10' onClick={() => setIsActive(!isActive)}>
        <div>
          {isActive ? '-' : '+'} {locationID}
        </div>
      </div>
      {isActive && (
        <div className='space-x-1 text-sm'>
          <div>
            123 Coffee Ave, New York, NY 10001 | www.{locationID.slice(0, 5)}
            .com
          </div>
          <div className='space-y-10 text-xs'>Tags: {tags.join(', ')}</div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div>
  //     <div>{locationID}</div>
  //     <div>{score}</div>
  //     <div>{tags.join(', ')}</div>
  //   </div>
  // );
};

export default Been;
