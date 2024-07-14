import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies, getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

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

/* Necessary function to prevent duplicates in discover vs upcoming
This was causing issues in terms of movies that could be in faves and playlist so the filter seemed the best solution
 It essentially filters out any movies in the upcoming array that have already been found in the discover array
 Might not be the most elegant solution but I'm not sure how else to avoid the conflicts
 */
const filterOutDuplicates = (upcomingMovies: BaseMovieProps[], discoveredMovies: BaseMovieProps[]) => {
  const discoveredMovieIds = discoveredMovies.map(movie => movie.id);
  return upcomingMovies.filter(movie => !discoveredMovieIds.includes(movie.id));
};

// Upcoming movies page -> basically the same as the home page but with upcoming movies
const UpcomingMoviesPage: React.FC = () => {
  const { data: upcomingData, error: upcomingError, isLoading: upcomingIsLoading, isError: upcomingIsError } = useQuery<DiscoverMovies, Error>("upcoming", getUpcomingMovies);
  const { data: discoveredData, error: discoveredError, isLoading: discoveredIsLoading, isError: discoveredIsError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (upcomingIsLoading || discoveredIsLoading) {
    return <Spinner />;
  }

  if (upcomingIsError) {
    return <h1>{upcomingError.message}</h1>;
  }

  if (discoveredIsError) {
    return <h1>{discoveredError.message}</h1>;
  }

  // Same logic as in the other pages featuring filters (homePage.tsx)
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  // Desctructuring the data for upcoming and discovered movies
  const upcomingMovies = upcomingData ? upcomingData.results : [];
  const discoveredMovies = discoveredData ? discoveredData.results : [];

  // Filter out duplicates via the aforementioned function
  const filteredUpcomingMovies = filterOutDuplicates(upcomingMovies, discoveredMovies);

  // Setting the displayed movies as the result of the filter function (the one that checks for genre, text etc)
  const displayedMovies = filterFunction(filteredUpcomingMovies);

  return (
    <>
      <PageTemplate
        title="UPCOMING MOVIES"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToPlaylistIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default UpcomingMoviesPage;
