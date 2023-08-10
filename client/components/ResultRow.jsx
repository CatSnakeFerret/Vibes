import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rate from './Rate.jsx';

const ResultRow = (props) => {
  const { place_id, place_name, category, address, neighborhood } =
    props.result;
  const [saveButtonText, setSaveButtonText] = useState('Save to wishlist');

  // saves location to savedList in user document
  const saveHandler = async () => {
    try {
      await axios.patch('api/savePlace', { place: place_id });
      setSaveButtonText('Saved!');
    } catch (error) {
      console.log(error);
    }
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
  };

  const clickFn = () => console.log('doin nothin');

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

  return (
    <tr>
      <td>{place_name}</td>
      <td>{address}</td>
      <div style={styles.container}>
        <Rate
          place_id={place_id}
          clickFn={clickFn}
          initalRateHandler={initalRateHandler}
        ></Rate>
        <button onClick={saveHandler}>{saveButtonText} </button>
      </div>
    </tr>
  );
};

export default ResultRow;
