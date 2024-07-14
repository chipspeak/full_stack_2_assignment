/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { BaseMovieProps } from "../../types/interfaces";

// Filter functions for the movie list by title and genre
export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

// Styles for the filter drawer and the filter button
const styles = {
  root: {
    backgroundColor: "#1a1a1a",
  },
  drawer: {
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  fabContainer: {
    position: "fixed",
    top: 75,
    left: 30, // Adjusted to move the Fab button to the left
  },
  fab: {
    backgroundColor: "white", 
    color: "black", 
    "&:hover": {
      backgroundColor: "#666666", 
      color: "white",
    },
  },
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box sx={styles.fabContainer}>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          sx={styles.fab}
        >
          Filter
        </Fab>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: styles.drawer,
        }}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;
