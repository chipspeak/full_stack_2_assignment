import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Pagination } from "@mui/material";
import ActorDetails from "../components/actorDetails";
import ActorCredits from "../components/actorCredits";
import ActorTvCredits from "../components/actorTVCredits";
import Spinner from "../components/spinner";
import { getActor, getActorMovieCredits, getActorTvCredits } from "../api/tmdb-api";
import { ActorDetailsProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites";

// ActorDetailsPage component
const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to manage which credits to render using the MUI toggle button
  const [showCredits, setShowCredits] = useState<"movies" | "tv">("movies");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  // Fetch actor details
  const { data: actor, error, isLoading, isError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id || "")
  );

  // Fetch actor's movie credits
  const { data: movieCredits, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery<{ cast: BaseMovieProps[] }, Error>(
    ["actorMovies", id],
    () => getActorMovieCredits(id || "")
  );

  // Fetch actor's TV credits
  const { data: tvCredits, isLoading: isTvLoading, isError: isTvError } = useQuery<{ cast: BaseTvShowProps[] }, Error>(
    ["actorTv", id],
    () => getActorTvCredits(id || "")
  );

  // Usual use of spinner
  if (isLoading || isMoviesLoading || isTvLoading) {
    return <Spinner />;
  }

  // Handle errors
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isMoviesError) {
    return <h1>Error loading movies</h1>;
  }

  if (isTvError) {
    return <h1>Error loading TV shows</h1>;
  }

  // This function is necessary to prevent the toggle from being selected regardless of the side the user chooses
  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newValue: "movies" | "tv" | null) => {
    /* We have to account for null as repeated presses without new data causes MUI to return null
    so in our use case we only want the toggle change to occur when the event provides non-null data 
    */
    if (newValue !== null) {
      setShowCredits(newValue);
      setCurrentPage(1); // Reset to first page when changing credits type to prevent pagination issues
    }
  };

  // Paginate movies or TV shows (same  logic as other main pages)
  const currentCredits = showCredits === "movies" ? movieCredits?.cast || [] : tvCredits?.cast || [];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCredits = currentCredits.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(currentCredits.length / PAGE_SIZE);

  return (
    <>
      {actor ? (
        <>
          <ActorDetails actor={actor} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, ml: 2, color: '#fff' }}>
              CREDITS
            </Typography>
          </Box>
          {/* Centered Toggle Button to select Movies or TV Shows */}
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={showCredits}
              exclusive
              onChange={handleToggleChange}
              aria-label="credits selection"
            >
              <ToggleButton value="movies" aria-label="movies" sx={{ color: "white" }}>
                Movie Credits
              </ToggleButton>
              <ToggleButton value="tv" aria-label="tv shows" sx={{ color: "white" }}>
                TV Credits
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Conditional rendering based on the selected toggle */}
          {showCredits === "movies" ? (
            <ActorCredits
              movies={paginatedCredits as BaseMovieProps[]}
              action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
            />
          ) : (
            <ActorTvCredits
              tvShows={paginatedCredits as BaseTvShowProps[]}
              action={(tvShow: BaseTvShowProps) => <AddToTvFavouritesIcon {...tvShow} />}
            />
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_event, value) => setCurrentPage(value)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'white', // Change page numbers to white
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: 'white', // Change ellipsis to white
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;
