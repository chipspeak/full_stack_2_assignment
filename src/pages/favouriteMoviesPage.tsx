import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import SortMoviesUI from "../components/sortMoviesUi";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

// Same filtering as on the main page
const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

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
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

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

  // Debugging: Log the fetched movies and their genres
  console.log("All Favourites:", allFavourites);
  allFavourites.forEach((movie) => {
    console.log("Movie Title:", movie.title, "Genres:", movie.genres);
  });

  const filteredMovies = filterFunction(allFavourites);

  // Additional Debugging: Log the filtered movies
  console.log("Filtered Movies:", filteredMovies);

  // Sort movies
  const sortedMovies = [...filteredMovies].sort((a, b) => {
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
  // Get paginated movies
  const paginatedMovies = sortedMovies.slice(startIndex, startIndex + PAGE_SIZE);
  // Calculate total pages
  const totalPages = Math.ceil(sortedMovies.length / PAGE_SIZE);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const changeSortOption = (sort: React.SetStateAction<string>) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  console.log("Filter: ", filterValues);

  return (
    <>
      <PageTemplate
        title="FAVOURITES"
        movies={paginatedMovies}
        action={(movie) => {
          return (
            <>
              <AddToFavouritesIcon {...movie} />
              <WriteReview {...movie} />
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

export default FavouriteMoviesPage;
