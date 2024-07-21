import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import ActorCredits from "../components/actorCredits"; // Import the new component
import { getActor, getActorMovieCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { ActorDetailsProps, BaseMovieProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

// The bulk of the material is handled by the ActorDetails component
const ActorDetailsPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();

  // Fetch actor details
  const { data: actor, error, isLoading, isError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id || "")
  );

  // Fetch actor's movie credits
  const { data: movieCredits, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery<{ cast: BaseMovieProps[] }, Error>(
    ["actorMovies", id],
    () => getActorMovieCredits(id || "")
  );

  // Usual use of spinner
  if (isLoading || isMoviesLoading) {
    return <Spinner />;
  }

  // Same logic as elswhere
  if (isError) {
    return <h1>{error.message}</h1>;
  }


  if (isMoviesError) {
    return <h1>Error loading movies</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <ActorDetails actor={actor} />
          {/* Display movies via movieList component with fave icon (looking into conditional for playlist icon etc*/}
          <ActorCredits movies={movieCredits?.cast || []} action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }} />
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
