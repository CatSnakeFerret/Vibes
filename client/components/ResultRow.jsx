import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rate from './Rate.jsx'

const ResultRow = (props) => {
    const { place_id, place_name, category, address, neighborhood } = props.result

    const [saveButtonText, setSaveButtonText] = useState('Save to wishlist');
    const [rating, setRating] = useState();


    // saves location to savedList in user document
    const saveHandler = async () => {
        try {
            await axios.patch('api/savePlace', {place: place_id})
            setSaveButtonText('Saved!')
        }
        catch (error) {
            console.log(error);
        }
    }

    // updates state and updates database -- although technically updating state is unnecessary
    const setRatingAsync = (rating) => {
        setRating(rating);
        rateHandler(rating);
    }

    const rateHandler = async (rating) => {
        try {
            await axios.patch('api/ratePlace', {place: place_id, rating: rating})
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

    // const initalSavedHandler = async () => {
    //     try {
    //         // console.log('THE PLACE IS' + place_id)
    //         const result = await axios.post('api/getSaved', {place: place_id})

    //         if (result === ) {
    //             setSaveButtonText('Saved!');
    //         }

           
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
        }
    }

    // renders existing star rating on initial page load
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