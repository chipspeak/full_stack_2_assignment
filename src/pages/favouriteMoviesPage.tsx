import React, { useContext, useEffect, useState } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SortMoviesUI from "../components/sortMoviesUi";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Sorting functions
const sortByDate = (a: { release_date: string | number | Date }, b: { release_date: string | number | Date }) =>
  new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
const sortByRating = (a: { vote_average: number }, b: { vote_average: number }) => b.vote_average - a.vote_average;
const sortByPopularity = (a: { popularity: number }, b: { popularity: number }) => b.popularity - a.popularity;

const FavouriteMoviesPage = () => {
  const [sortOption, setSortOption] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8; // Number of movies per page

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { favourites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries are still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  // Filtering through the favourites list to display only the movies that match the filter criteria
  const allFavourites = favouriteMovieQueries.map((q) => q.data).filter((movie) => movie !== undefined);

  // Sort movies
  const sortedMovies = [...allFavourites].sort((a, b) => {
    switch (sortOption) {
      case "none":
        return 0;
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

  // Calculate start index for pagination
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  // Get paginated movies based on start index and page size
  const paginatedMovies = sortedMovies.slice(startIndex, startIndex + PAGE_SIZE);
  // Calculate total pages based on total movies and page size
  const totalPages = Math.ceil(sortedMovies.length / PAGE_SIZE);

  // Function to change the sort option
  const changeSortOption = (sort: React.SetStateAction<string>) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return (
    <>
      <MovieListPageTemplate
        title="MOVIE FAVOURITES"
        movies={paginatedMovies}
        action={(movie) => {
          return (
            <>
              <AddToFavouritesIcon {...movie} />
            </>
          );
        }}
      />
      <SortMoviesUI onSortChange={changeSortOption} />
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default FavouriteMoviesPage;
