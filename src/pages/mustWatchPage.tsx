import React, { useContext } from "react"
import { useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import RemoveFromPlaylist from "../components/cardIcons/removeFromPlaylist";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";

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

// Must Watch Page
const MustWatchPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { playlists: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Creating an array of queries and run them in parallel
  const playlistMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading
  const isLoading = playlistMovieQueries.find((m) => m.isLoading === true);

  // If any of the queries are still loading, return a spinner
  if (isLoading) {
    return <Spinner />;
  }

  /* Filtering through the playlist to display only the movies that match the filter criteria
     Same logic as the faves page
  */
  const allMoviesInPlaylist = playlistMovieQueries.map((q) => q.data);
  const displayedMovies = allMoviesInPlaylist
    ? filterFunction(allMoviesInPlaylist)
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };



  return (
    <>
   <PageTemplate
        title="MUST WATCH"
        movies={displayedMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromPlaylist {...movie} />
            </>
          );
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

export default MustWatchPage;