import React, { useContext } from "react";
import { TvShowsContext } from "../../contexts/tvContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTvShowProps } from "../../types/interfaces";

// Component to add/remove a TV show from favourites (basic idea is to allow a toggleable button rather than multiple)
const AddToTvFavouritesIcon: React.FC<BaseTvShowProps> = (tvShow) => {
    const { favourites, addToFavourites, removeFromFavourites } = useContext(TvShowsContext); // Destructure context values

    // Check if the TV show is in favourites
    const isFavourite = favourites.includes(tvShow.id);

    // Toggle between adding and removing from favourites
    const onUserSelect = () => {
        if (isFavourite) {
            removeFromFavourites(tvShow); // Remove from favourites
        } else {
            addToFavourites(tvShow); // Add to favourites
        }
    };

    // Return the button with the appropriate colour based on whether the TV show is in favourites
    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon style={{ color: isFavourite ? "red" : "white" }} fontSize="medium" />
        </IconButton>
    );
};

export default AddToTvFavouritesIcon;
