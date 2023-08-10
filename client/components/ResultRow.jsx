import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rate from './Rate.jsx';

const ResultRow = (props) => {
  const { place_id, place_name, category, address, neighborhood } =
    props.result;
  const { idx } = props;
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

  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{place_name}</td>
      <td>{category}</td>
      <td>{neighborhood}</td>
      <td>{address}</td>
      <td>
        <Rate place_id={place_id} clickFn={clickFn}></Rate>
      </td>
      <td>
        <button
          onClick={saveHandler}
          className='bg-blue-500 hover:bg-yellow-400 text-black  py-2 px-4 rounded'
        >
          {saveButtonText}{' '}
        </button>
      </td>
    </tr>
  );
};

export default ResultRow;
