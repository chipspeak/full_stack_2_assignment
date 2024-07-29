import React, { useContext, useEffect, useState } from "react";
import TVShowListPageTemplate from "../components/templateTvShowListPage"; // Component for displaying TV shows
import WriteReview from "../components/cardIcons/writeReview"; // Ensure this is compatible with TV shows
import { BaseTvShowProps } from "../types/interfaces"; // Ensure this is the correct interface for TV shows
import { TvShowsContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api"; // Ensure this is the correct API function for TV shows
import Spinner from "../components/spinner";
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites"; // Ensure this is the correct icon component for TV shows
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination"; // Importing pagination component
import SortTvUi from "../components/sortTvUi";

const FavouriteTvShowsPage: React.FC = () => {
  // State for sorting and pagination
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 8; // Number of TV shows per page

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { favourites: tvShowIds } = useContext(TvShowsContext);

  // Create an array of queries and run them in parallel
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => ({
      queryKey: ["tvShow", tvShowId],
      queryFn: () => getTvShow(tvShowId.toString()), // Ensure this function fetches TV shows
    }))
  );

  // Check if any of the parallel queries are still loading
  const isLoading = favouriteTvShowQueries.some((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  // Filtering through the favourites list to display only the TV shows that match the filter criteria
  const allFavourites = favouriteTvShowQueries.map((q) => q.data).filter((data): data is BaseTvShowProps => data !== undefined);

  // Sorting functions
  const sortByDate = (a: BaseTvShowProps, b: BaseTvShowProps) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
  const sortByRating = (a: BaseTvShowProps, b: BaseTvShowProps) => b.vote_average - a.vote_average;
  const sortByPopularity = (a: BaseTvShowProps, b: BaseTvShowProps) => b.popularity - a.popularity;

  // Apply sorting
  const sortedTvShows = [...allFavourites].sort((a, b) => {
    switch (sortOption) {
      case "date":
        return sortByDate(a, b);
      case "rating":
        return sortByRating(a, b);
      case "popularity":
        return sortByPopularity(a, b);
      default:
        return 0;
    }
  });

  // Pagination logic
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTvShows = sortedTvShows.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(sortedTvShows.length / PAGE_SIZE);

  // Function to change sorting option
  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <>
      <TVShowListPageTemplate
        title="TV FAVOURITES"
        tvShows={paginatedTvShows} // Ensure this prop is handled in your PageTemplate for TV shows
        action={(tvShow: BaseTvShowProps) => {
          return (
            <>
              <AddToTvFavouritesIcon {...tvShow} />
              {/* <WriteReview {...tvShow} /> {/* Ensure this component is compatible with TV shows */}
            </>
          );
        }}
      />
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
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
  );
};

export default FavouriteTvShowsPage;
