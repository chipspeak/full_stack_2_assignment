import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseMovieProps } from "../../types/interfaces";

// Component to add/remove a movie from favourites (basic idea is to allow a toggleable button rather than multiple)
const AddToFavouritesIcon: React.FC<BaseMovieProps> = (movie) => {
    const { favourites, addToFavourites, removeFromFavourites } = useContext(MoviesContext);

    // Check if the movie is in favourites
    const isFavourite = favourites.includes(movie.id);

    // Toggle between adding and removing from favourites
    const onUserSelect = () => {
        if (isFavourite) {
            removeFromFavourites(movie); // Remove from favourites
        } else {
            addToFavourites(movie); // Add to favourites
        }
    };

    // Return the button with the appropriate colour based on whether the movie is in favourites  
    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon style={{ color: isFavourite ? "red" : "white" }} fontSize="medium" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;
