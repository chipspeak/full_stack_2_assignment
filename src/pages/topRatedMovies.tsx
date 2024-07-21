import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import { getTopMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import SortMoviesUI from "../components/sortMoviesUi";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

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
// Sort by Earnings
const sortByEarnings = (a: BaseMovieProps, b: BaseMovieProps) => b.revenue - a.revenue;

// Top Rated movies page
const TopRatedMoviesPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("top", getTopMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

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
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
  };

  // Destructuring the data from the API call
  const movies = data ? data.results : [];

  // Setting the displayed movies as the result of the filter function
  const filteredMovies = filterFunction(movies);

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
      case "earnings":  
        return sortByEarnings(a, b);
      default:
        return 0;
    }
  });

  return (
    <>
      <MovieListPageTemplate
        title="TOP RATED MOVIES"
        movies={sortedMovies}
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
    </>
  );
};
export default TopRatedMoviesPage;
