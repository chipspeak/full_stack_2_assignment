import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import ActorCredits from "../components/actorCredits";
import { getActor, getActorMovieCredits, getActorTvCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { ActorDetailsProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites";
import ActorTvCredits from "../components/actorTVCredits";

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

  // Fetch actor's TV credits
  const { data: tvCredits, isLoading: isTvLoading, isError: isTvError } = useQuery<{ cast: BaseTvShowProps[] }, Error>(
    ["actorTv", id],
    () => getActorTvCredits(id || "")
  );

  // Usual use of spinner
  if (isLoading || isMoviesLoading || isTvLoading) {
    return <Spinner />;
  }

  // Same logic as elsewhere
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isMoviesError) {
    return <h1>Error loading movies</h1>;
  }

  if (isTvError) {
    return <h1>Error loading TV shows</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <ActorDetails actor={actor} />
          {/* Display movies via movieList component with fave icon */}
          <ActorCredits
            movies={movieCredits?.cast || []}
            action={(movie: BaseMovieProps) => {
              return <AddToFavouritesIcon {...movie} />;
            }}
          />
          {/* Display TV shows via tvList component with fave icon */}
          <ActorTvCredits
            tvShows={tvCredits?.cast || []}
            action={(tvShow: BaseTvShowProps) => {
              return <AddToTvFavouritesIcon {...tvShow} />;
            }}
          />
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
