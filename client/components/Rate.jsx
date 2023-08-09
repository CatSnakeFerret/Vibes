import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import axios from 'axios';
const Rate = (props) => {

    return (
        <Container>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                props.setRating(givenRating)
                            }}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < props.rating || givenRating === props.rating
                                        ? "000"
                                        : "rgb(192,192,192)"
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