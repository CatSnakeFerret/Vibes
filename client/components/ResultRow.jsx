import React, { useState } from 'react';
import axios from 'axios';

const ResultRow = (props) => {
    const { place_id, place_name, category, address, neighborhood } = props.result

    const [saveButtonText, setSaveButtonText] = useState('Save')
    const [rating, setRating] = useState();
    const [ratingButtonText, setRatingButtonText] = useState('Rate')


    const saveHandler = async () => {
        try {
            await axios.patch('api/savePlace', {place: place_id})
            setSaveButtonText('Saved!')
        }
        catch (error) {
            console.log(error);
        }
    }

    const rateHandler = async () => {
        try {
            await axios.patch('api/ratePlace', {place: place_id, rating: 5})
            setRatingButtonText('Rated!')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <button onClick={rateHandler}>{ratingButtonText}</button>
            <button onClick={saveHandler}>{saveButtonText}</button>
        </tr>
    );
}

export default ResultRow;