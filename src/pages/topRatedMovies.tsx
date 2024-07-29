import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import { getTopMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import SortMoviesUI from "../components/sortMoviesUi";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination";
import Fuse from "fuse.js";

// Filtering via title
const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

// Filtering via genre
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

/* Sorting functions (These compare two movies and return a value based on the sort type which are in turn based on fields from the response)
 Sort by Date
*/
const sortByDate = (a: BaseMovieProps, b: BaseMovieProps) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
// Sort by Rating
const sortByRating = (a: BaseMovieProps, b: BaseMovieProps) => b.vote_average - a.vote_average;
// Sort by Popularity
const sortByPopularity = (a: BaseMovieProps, b: BaseMovieProps) => b.popularity - a.popularity;

// Top Rated movies page
const TopRatedMoviesPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fuse, setFuse] = useState<Fuse<BaseMovieProps> | null>(null);
  const PAGE_SIZE = 8; // Number of movies per page

  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch movies
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("top", getTopMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  // Using useffect to initialize the fuse instance when the data is loaded (this is the data fuse will refer to)
  useEffect(() => {
    if (data?.results) {
      const fuseInstance = new Fuse(data.results, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.5 // Adjust the threshold for fuzzy matching
      });
      setFuse(fuseInstance);
    }
  }, [data]);

  // Loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Error message display
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Same logic as in the other pages featuring filters
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = type === "title"
      ? [changedFilter, filterValues[1]]
      : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1); // Reset to first page when filters change (this aids user legibility as the first page will always be shown thus reflecting the results)
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when filters change (this aids user legibility as the first page will always be shown thus reflecting the results)
  };

  // Destructuring the data from the API call
  const movies = data ? data.results : [];

  // Setting the displayed movies as the result of the filter function
  let filteredMovies = filterFunction(movies);

  // Use Fuse.js for title filtering if fuse is initialized
  if (fuse) {
    const titleFilterValue = filterValues[0].value;
    if (titleFilterValue) {
      filteredMovies = fuse.search(titleFilterValue).map(result => result.item);
    }
  }

  // Movie sorting is carried out by spreading the filtered movies into a new array and sorting them based on the sort option
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

  /* Calculate start index via current page (using minus 1 to account for 0 indexing) and multiplying by the page size
  This gives us the current index of the movies array to start the page from
  */
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  /* Using the sortedMovies array (which is already filtered and sorted) to extract the relevant movies for the current page
  This is done by using the start index and adding the page size to it to get the end index and slicing the section outlined by these indices
  */
  const paginatedMovies = sortedMovies.slice(startIndex, startIndex + PAGE_SIZE);

  // Calculate total pages by using the length of the sorted movies array divided by the page size
  const totalPages = Math.ceil(sortedMovies.length / PAGE_SIZE);

  return (
    <>
      <MovieListPageTemplate
        title="TOP RATED MOVIES"
        movies={paginatedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
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

export default TopRatedMoviesPage;
