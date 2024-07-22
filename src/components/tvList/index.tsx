import React from "react";
import TVShow from "../tvCard/"; // Adjust the import path if necessary
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps, BaseTvShowProps } from "../../types/interfaces"; // Adjust the import path if necessary

// This component is a list of TV show cards for use in the various main pages
const TVShowList: React.FC<BaseTvShowListProps> = ({ tvShows, action }) => {
  // eslint-disable-next-line prefer-const
  let tvShowCards = tvShows.map((tvShow: BaseTvShowProps) => (
    <Grid key={tvShow.id} item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ backgroundColor: '#1a1a1a', color: 'white' }}>
      <TVShow key={tvShow.id} tvShow={tvShow} action={action} />
    </Grid>
  ));
  return tvShowCards;
}

export default TVShowList;
