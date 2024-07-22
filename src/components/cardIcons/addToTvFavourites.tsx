import React, { useContext } from "react";
import { TvShowsContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTvShowProps } from "../../types/interfaces";

const AddToTvFavouritesIcon: React.FC<BaseTvShowProps> = (tvShow) => {
    const context = useContext(TvShowsContext);
    const { favourites } = context;

  // Check if the TV show is in favourites
  const isFavourite = favourites.includes(tvShow.id);

  const onUserSelect = () => {
    if (isFavourite) {
      context.removeFromFavourites(tvShow);
    } else {
      context.addToFavourites(tvShow);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon style={{ color: isFavourite ? "red" : "white" }} fontSize="medium" />
    </IconButton>
  );
};

export default AddToTvFavouritesIcon;
