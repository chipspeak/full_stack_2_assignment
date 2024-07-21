import React from "react"; // replace existing react import
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import TemplateMoviePage from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";

// MovieDetailsPage page. Most of this pages details are handlded within the component itself
const MovieDetailsPage: React.FC= () => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  // Loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Error message display
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  // Passing the movie to its page template and the same movie to the details component
  return (
    <>
      {movie ? (
        <>
        <TemplateMoviePage movie={movie}> 
          <MovieDetails {...movie} />
        </TemplateMoviePage>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;