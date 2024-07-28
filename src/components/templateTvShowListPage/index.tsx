import React, { useEffect } from "react";
import Header from "../headerTvShowList";
import Grid from "@mui/material/Grid";
import TVShowList from "../tvList";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

// Styling for the TV show list page
const styles = {
  root: { 
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "20px",
  }
};

// This component is a template for the TV show list page
const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ tvShows, title, action }) => {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TVShowList action={action} tvShows={tvShows} />
      </Grid>
    </Grid>
  );
}

export default TVShowListPageTemplate;
