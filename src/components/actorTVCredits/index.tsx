import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { BaseTvShowListProps } from "../../types/interfaces";
import TvShowList from "../tvList";

const ActorTvCredits: React.FC<BaseTvShowListProps> = ({ tvShows, action }) => {
  // Filter out TV shows without a poster => no point in displaying them and they do occur with more obscure actors
  const tvShowsWithPoster = tvShows.filter((tvShow) => tvShow.poster_path);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="h2" sx={{ mb: 4, ml: 2, color: '#fff' }}>
        TV Show Credits
      </Typography>
      <Grid container spacing={5} sx={{ padding: "20px" }}>
        <TvShowList action={action} tvShows={tvShowsWithPoster}></TvShowList>
      </Grid>
    </Box>
  );
};

export default ActorTvCredits;
