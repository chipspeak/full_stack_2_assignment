import React from "react";
import { Grid, Box } from "@mui/material";
import { BaseMovieListProps } from "../../types/interfaces";
import MovieList from "../movieList";

const ActorCredits: React.FC<BaseMovieListProps> = ({ movies, action }) => {
  // Filter out movies without a poster => no point in displaying them and they do occur with more obscure actors
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container spacing={5} sx={{padding: "20px"}}>
        <MovieList action={action} movies={moviesWithPoster}></MovieList>
      </Grid>
    </Box>
  );
};

export default ActorCredits;
