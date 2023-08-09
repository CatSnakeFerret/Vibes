import React from 'react';

const SavedPlace = (props) => {
  const {
    address,
    category,
    neighborhood,
    place_id,
    place_name,
    telephone,
    zip,
  } = props;

  return (
    <div>
      <div>{place_name}</div>
      <div>{address}</div>
      <div>{zip}</div>
      <div>{neighborhood}</div>
      <div>{telephone}</div>
      <div>{category}</div>
    </div>
  );
};

export default SavedPlace;
