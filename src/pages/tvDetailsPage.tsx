import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvDetails"; // Replace with your TV show details component
import TemplateTvShowPage from "../components/templateTvShowPage"; // Replace with your TV show template page component
import { getTvShow } from '../api/tmdb-api'; // Replace with your TV show API function
import { useQuery } from "react-query";
import Spinner from '../components/spinner'; // Spinner component for loading state
import { TvShowDetailsProps } from "../types/interfaces"; // Replace with your TV show details props interface

const TvDetailsPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const { data: tvShow, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
    ["tvShow", id],
    () => getTvShow(id || "")
  );

  // Loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Error message display
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  // Passing the TV show to its page template and the TV show details component
  return (
    <>
      {tvShow ? (
        <TemplateTvShowPage tvShow={tvShow}>
          <TvShowDetails {...tvShow} />
        </TemplateTvShowPage>
      ) : (
        <p>Waiting for TV show details</p>
      )}
    </>
  );
};

export default TvDetailsPage;
