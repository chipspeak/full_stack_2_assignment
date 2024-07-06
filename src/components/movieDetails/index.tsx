import React, { useState } from "react";
import Chip from "@mui/material/Chip";
// import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRateIcon from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap" as const, // Ensure TypeScript understands this as a constant value
    listStyle: "none" as const,
    padding: 1.5,
    margin: 0,
  },
  chip: {
    color: "#ffffff",
    backgroundColor: "transparent", // transparent background
    margin: "0.5rem", 
    border: "1px solid #ffffff", // white border to ensure visibility
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
  overviewText: {
    color: "#ffffff",
    marginTop: "1rem",
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

      <div style={styles.chipSet}>
        {movie.genres.map((g) => (
          <Chip
            key={g.name}
            label={g.name}
            sx={styles.chip}
          />
        ))}
      </div>
      <div style={styles.chipSet}>
        <Chip
          icon={<AccessTimeIcon />}
          label={`${movie.runtime} min.`}
          sx={styles.chip}
        />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
          sx={styles.chip}
        />
        <Chip
          icon={<StarRateIcon />}
          label={`${movie.vote_average} (${movie.vote_count})`}
          sx={styles.chip}
        />
        <Chip
          label={`Released: ${movie.release_date}`}
          sx={styles.chip}
        />
      </div>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ ...styles.fab, marginTop: "1rem" }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews {...movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
