import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Container, Radio, Rating } from './RatingStyles';
import axios from 'axios';
const Rate = (props) => {
  const [rating, setRating] = useState();

  const rateHandler = async (rating) => {
    try {
      await axios.patch('api/ratePlace', {
        place: props.place_id,
        rating: rating,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // renders rating
  //   const initalRateHandler = async () => {
  //     try {
  //       // console.log('THE PLACE IS' + place_id)
  //       const result = await axios.post('api/getRating', {
  //         place: props.place_id,
  //       });
  //       setRating(result.data.rating);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // updates rating in state and database
  const setRatingAndState = (rating) => {
    setRating(rating);
    rateHandler(rating);
  };
  // renders existing star rating on initial page load
  useEffect(() => {
    props.initalRateHandler();
  }, []);

  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type='radio'
              value={givenRating}
              onClick={() => {
                // props.setRating(givenRating)
                setRatingAndState(givenRating);
                // props.clickFn();
                // console.log(rating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rating || givenRating === rating
                    ? '000'
                    : 'rgb(192,192,192)'
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;
