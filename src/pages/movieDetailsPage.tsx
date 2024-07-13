import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import TemplateMoviePage from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";

// MovieDetailsPage page. Most of this pages details are handlded within the component itself
const MovieDetailsPage: React.FC= () => {
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