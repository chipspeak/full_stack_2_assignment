import React, { useContext } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import HomeIcon from "@mui/icons-material/Home";
import { MoviesContext } from "../../contexts/moviesContext";
import { Avatar } from "@mui/material";
import { MovieDetailsProps } from "../../types/interfaces"; 
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

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  
  // favourites
  const { favourites } = useContext(MoviesContext);
  let favourite = movie.favourite;
  if (favourites.find((id) => id === movie.id)) 
    favourite = true;

  // playlists
  const { playlists } = useContext(MoviesContext);
  let playlist = movie.playlist;
  if (playlists.find((id) => id === movie.id)) 
    playlist = true;
  
  return (
    <Paper component="div" sx={styles.root}>
      <Typography variant="h4" component="h3">
        {movie.title}
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

export default MovieHeader;