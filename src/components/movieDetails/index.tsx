import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { MovieDetailsProps } from "../../types/interfaces";
import { Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

// Styling for the movie details section
const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chip: {
    color: "#ffffff",
    backgroundColor: "transparent", // Transparent background for the chip items
    margin: "0.5rem",
    border: "2px solid #ffffff",
  },
  // Styling for the fab button for reviews
  fabContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  fab: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    width: "auto", 
    height: "auto", 
    padding: "0.5rem 1rem",
  },
  overviewText: {
    color: "#ffffff",
    textAlign: "center",
  },
};

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3" sx={styles.overviewText}>
        {movie.tagline}
      </Typography>
      <Typography variant="h6" component="p" sx={styles.overviewText}>
        {movie.overview}
      </Typography>

      <Box sx={styles.chipSet}>
        {movie.genres.map((g) => (
          <Chip key={g.name} label={g.name} sx={styles.chip} />
        ))}
      </Box>
      <Box sx={styles.chipSet}>
        <Chip
          icon={<AccessTimeIcon />}
          label={`${movie.runtime} min.`}
          sx={styles.chip}
        />
        <Chip
          icon={<MonetizationIcon />}
          label={`$${movie.revenue.toLocaleString()}`}
          sx={styles.chip}
        />
        <Chip
          icon={<StarRateIcon />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={styles.chip}
        />
        <Chip label={`Released: ${movie.release_date}`} sx={styles.chip} />
        <Chip label={`Popularity: ${movie.popularity}`} sx={styles.chip} />
      </Box>

      <Box sx={styles.fabContainer}>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          sx={styles.fab}
        >
          <NavigationIcon />
          Reviews
        </Fab>
      </Box>

      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews {...movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
