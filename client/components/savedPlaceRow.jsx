import React from 'react';

const SavedPlace = (props) => {
  const { locationID, score, tags } = props;
  console.log(locationID);

  return (
    <div>
      <div>{locationID}</div>
      <div>{score}</div>
      <div>{tags}</div>
    </div>
  );
};

export default SavedPlace;
