import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { Box } from "@mui/system";

const MovieReviewPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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