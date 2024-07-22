import React, { useState } from "react";
import FilterCard from "../filterMoviesCard"; // Assuming this is a generic filter component
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { BaseTvShowProps } from "../../types/interfaces"; // Make sure this interface is correctly defined

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
  textField: {
    '& .MuiInputBase-input': {
      color: 'white', // Text color
    },
    '& .MuiInputLabel-root': {
      color: 'white', // Label color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white', // Border color for the input
      },
      '&:hover fieldset': {
        borderColor: 'white', // Border color on hover
      },
    },
  }
}

// Filter function for TV shows by title
export const titleFilter = (tvShow: BaseTvShowProps, value: string): boolean => {
  return tvShow.name.toLowerCase().includes(value.toLowerCase());
};

// Filter function for TV shows by genre
export const genreFilter = (tvShow: BaseTvShowProps, value: string): boolean => {
  const genreId = Number(value);
  const genreIds = tvShow.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};


interface TvShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
}

const TvShowFilterUI: React.FC<TvShowFilterUIProps> = ({
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

export default TvShowFilterUI;
