import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseMovieProps} from "../../types/interfaces"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WriteReviewIcon:React.FC<BaseMovieProps> = (movie) => {
  return (
    <RateReviewIcon color="primary" fontSize="large" />
  );
};

export default  WriteReviewIcon;