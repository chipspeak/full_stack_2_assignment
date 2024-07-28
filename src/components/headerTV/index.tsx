import React, { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TvShowsContext } from "../../contexts/tvContext";
import { Avatar } from "@mui/material";
import { TvShowDetailsProps } from "../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";

const styles = {
  root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
    backgroundColor: "#1a1a1a",
    color: "white",
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const TVShowHeader: React.FC<TvShowDetailsProps> = (tvShow) => {
  
  // favourites
  const { favourites } = useContext(TvShowsContext);
  let favourite = tvShow.favourite;
  if (favourites.find((id: number) => id === tvShow.id)) 
    favourite = true;

  // playlists (doesn't exist yet as I may entirely scrap this feature from movies)
  const { playlists } = useContext(TvShowsContext);
  let playlist = tvShow.playlist;
  if (playlists.find((id: number) => id === tvShow.id)) 
    playlist = true;
  
  return (
    <Paper component="div" sx={styles.root}>
      <Typography variant="h4" component="h3">
        {tvShow.name}
        <br />
      </Typography>
      {
        favourite ? (
          <Avatar sx={styles.avatar}>
            <FavoriteIcon />
          </Avatar>
        ) : null
      }
      {
        playlist ? (
          <Avatar sx={styles.avatar}>
            <PlaylistIcon />
          </Avatar>
        ) : null
      }
    </Paper>
  );
};

export default TVShowHeader;
