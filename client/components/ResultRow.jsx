import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rate from './Rate.jsx'

const ResultRow = (props) => {
    const { place_id, place_name, category, address, neighborhood } = props.result

    const [saveButtonText, setSaveButtonText] = useState('Save to wishlist');
    const [rating, setRating] = useState();



    const saveHandler = async () => {
        try {
            await axios.patch('api/savePlace', {place: place_id})
            setSaveButtonText('Saved!')
        }
        catch (error) {
            console.log(error);
        }
    }

    const setRatingAsync = (rating) => {
        setRating(rating);
        rateHandler(rating);
    }

    const rateHandler = async (rating) => {
        try {
            await axios.patch('api/ratePlace', {place: place_id, rating: rating})
            setRatingButtonText('Rated!')
        }
        catch (error) {
            console.log(error);
        }
    }

    const initalRateHandler = async () => {
        try {
            // console.log('THE PLACE IS' + place_id)
            const result = await axios.post('api/getRating', {place: place_id})
            setRating(result.data.rating);
        }
        catch (error) {
            console.log(error);
        }
    }

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
        }
    }
    useEffect(() => {
        initalRateHandler();
    }, [])

    console.log(rating);

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <div style={styles.container}>
            <Rate place_id={place_id} rating={rating} setRating={setRatingAsync} sendRating={rateHandler}></Rate>
            <button onClick={saveHandler}>{saveButtonText}</button>
            </div>
        </tr>
    );
}

export default ResultRow;