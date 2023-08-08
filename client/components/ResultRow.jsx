import React from 'react';
import axios from 'axios';

const ResultRow = (props) => {
    const { place_id, place_name, category, address, neighborhood } = props.result

    const saveHandler = async () => {
        try {
            console.log('the user is' + props.username)
            await axios.patch('api/savePlace', {username: props.username, place: place_id})
        }

        catch (error) {
            console.log(error);
        }

        // fetch('api/savePlace', {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: {
        //         "username": props.username,
        //         "place": place_id
        //     }
        // })

        // .then((response) => response.json())
        // .then((data) => console.log(data))

    }

    return (
        <tr>
            <td>{place_name}</td>
            <td>{address}</td>
            <button>Rate</button>
            <button onClick={saveHandler}>Save</button>
        </tr>
    );
}

export default ResultRow;