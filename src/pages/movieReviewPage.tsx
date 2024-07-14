import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { Box } from "@mui/system";

const MovieReviewPage: React.FC = () => {
  const { state : {movie, review } } = useLocation()
  return (
    <PageTemplate movie={movie}>
      <Box>
      <MovieReview {...review} />
      </Box>
    </PageTemplate>
  );
};

export default MovieReviewPage;