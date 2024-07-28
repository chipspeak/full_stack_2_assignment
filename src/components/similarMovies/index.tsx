import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { BaseMovieProps } from "../../types/interfaces";
import MovieList from "../movieList";

interface SimilarMoviesProps {
  movies: BaseMovieProps[];
  action: (movie: BaseMovieProps) => React.ReactNode;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, action }) => {
  // Filter out movies without a poster
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" component="div" sx={{ textAlign: "center", color: "#fff", mb: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
        SIMILAR MOVIES
      </Typography>
      <Grid container spacing={5} sx={{ padding: "20px" }}>
        <MovieList movies={moviesWithPoster} action={action} />
      </Grid>
    </Box>
  );
};

export default SimilarMovies;
