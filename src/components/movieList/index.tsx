import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps, BaseMovieProps } from "../../types/interfaces";

const MovieList: React.FC<BaseMovieListProps> = ({movies, action }) => {
  // eslint-disable-next-line prefer-const
  let movieCards = movies.map((m: BaseMovieProps) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie key={m.id} movie={m} action={action}/>
    </Grid>
  ));
  return movieCards;
}

export default MovieList;