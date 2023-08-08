import React from 'react';

const Been = (props) => {
  const { locationID, score, tags } = props;
  console.log(locationID);

  return (
    <div>
      <div>{locationID}</div>
      <div>{score}</div>
      <div>{tags.join(', ')}</div>
    </div>
  );
};

export default Been;
