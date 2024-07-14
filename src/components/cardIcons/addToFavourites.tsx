import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../types/interfaces";

const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);
  const { favourites } = context;

  // Check if the movie is in favourites
  const isFavourite = favourites.includes(movie.id);

  const onUserSelect = () => {
    /* Toggle favourites status -> this may be slightly hacky but it prevents duplicates of the icon from the old method
    and it also prevents any conflicts with other icons passed as props */
    if (isFavourite) {
      context.removeFromFavourites(movie);
    } else {
      context.addToFavourites(movie);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon style={{ color: isFavourite ? "red" : "white" }} fontSize="medium" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;
