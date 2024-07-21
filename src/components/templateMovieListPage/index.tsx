import React from "react";
import { useEffect } from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import {  MovieListPageTemplateProps } from "../../types/interfaces";

// Again, setting the dark grey background color and ensuring some padding to prevent the expanded cards from prompting the horizontal scrollbar
const styles = {
  root: { 
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "20px",
  }
};

// This component is a template for the movie list page
const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({ movies, title, action })=> {
    // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
      <MovieList action={action} movies={movies}></MovieList>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;