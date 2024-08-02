import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import ListIcon from "@mui/icons-material/List";
import LayersIcon from "@mui/icons-material/Layers";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { TvShowDetailsProps } from "../../types/interfaces";
import { Box } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import TvReviews from "../tvReviews";

// Styling for the TV show details section
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
    fontSize: "1rem",
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

const TVShowDetails: React.FC<TvShowDetailsProps> = (tvShow) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3" sx={styles.overviewText}>
        {tvShow.tagline}
      </Typography>
      <Typography variant="h6" component="p" sx={styles.overviewText}>
        {tvShow.overview}
      </Typography>

      <Box sx={styles.chipSet}>
        {tvShow.genres.map((g) => (
          <Chip key={g.name} label={g.name} sx={styles.chip} />
        ))}
      </Box>
      <Box sx={styles.chipSet}>
        <Chip
          icon={<ListIcon />}
          label={`${tvShow.number_of_episodes} episodes`}
          sx={styles.chip}
        />
        <Chip
          icon={<LayersIcon />}
          label={`${tvShow.number_of_seasons} seasons`}
          sx={styles.chip}
        />
        <Chip label={`First Air Date: ${tvShow.first_air_date}`} sx={styles.chip} />
        <Chip label={`Popularity: ${tvShow.popularity}`} sx={styles.chip} />
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
        <TvReviews {...tvShow} />
      </Drawer>
    </>
  );
};

export default TVShowDetails;
