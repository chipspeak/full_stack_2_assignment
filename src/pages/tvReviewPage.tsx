import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TemplateTvShowPage from "../components/templateTvShowPage";
import TvReview from "../components/tvReview";
import { Box } from "@mui/system";

const TvReviewPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { state : {tvShow, review } } = useLocation()
  return (
    <TemplateTvShowPage tvShow={tvShow}>
      <Box>
      <TvReview {...review} />
      </Box>
    </TemplateTvShowPage>
  );
};

export default TvReviewPage;