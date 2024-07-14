import React from "react";
import { Review } from "../../types/interfaces";
import { Typography } from "@mui/material";

const MovieReview: React.FC<Review> =  (props) => {
  return (
    <>
    <Typography variant="h6" component="h3">
      <p>Review By: {props.author} </p>
      <p>{props.content} </p>
    </Typography>
    </>
  );
};
export default MovieReview