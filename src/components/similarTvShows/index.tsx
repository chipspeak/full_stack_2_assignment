import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { BaseTvShowProps } from "../../types/interfaces"; 
import TVShowList from "../tvList"; 

interface SimilarTvShowsProps {
  tvShows: BaseTvShowProps[];
  action: (tvShow: BaseTvShowProps) => React.ReactNode;
}

const SimilarTVShows: React.FC<SimilarTvShowsProps> = ({ tvShows, action }) => {
  // Filter out TV shows without a poster
  const tvShowsWithPoster = tvShows.filter((tvShow) => tvShow.poster_path);

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Typography variant="h4" component="div" sx={{ textAlign: "center", color: "#fff", mb: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
        SIMILAR SHOWS
      </Typography>
      <Grid container spacing={5} sx={{ padding: "20px" }}>
        <TVShowList tvShows={tvShowsWithPoster} action={action} />
      </Grid>
    </Box>
  );
};

export default SimilarTVShows;
