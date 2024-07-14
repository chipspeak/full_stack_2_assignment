import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const AddToPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);
  const { playlists } = context;

  // Check if the movie is in playlist
  const isInPlaylist = playlists.includes(movie.id);

  const onUserSelect = () => {
    // Same logic as the favourite icon where we essentially toggle the status using a conditional and context
    if (isInPlaylist) {
      context.removeFromPlaylist(movie);
    } else {
      context.addToPlaylist(movie);
    }
  };

  return (
    <IconButton aria-label="add to must watch" onClick={onUserSelect}>
      <PlaylistAddIcon style={{ color: isInPlaylist ? "blue" : "white" }} fontSize="medium" />
    </IconButton>
  );
};

export default AddToPlaylistIcon;
