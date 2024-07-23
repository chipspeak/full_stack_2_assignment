import React, { useContext, useEffect } from "react";
import PageTemplate from "../components/templateTvShowListPage"; // Assuming a similar template exists for TV shows
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites"; // You might need a similar component for TV shows
import WriteReview from "../components/cardIcons/writeReview"; // Ensure this is compatible with TV shows
import { BaseTvShowProps } from "../types/interfaces"; // Ensure this is the correct interface for TV shows
import { TvShowsContext } from "../contexts/tvContext";
import { useQueries } from "react-query";
import { getTvShow } from "../api/tmdb-api"; // Ensure this is the correct API function for TV shows
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvFilterUi"; // Ensure this is the correct filter UI component for TV shows
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites"; // Ensure this is the correct icon component for TV shows

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

const FavouriteTvShowsPage: React.FC = () => {
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { favourites: tvShowIds } = useContext(TvShowsContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Create an array of queries and run them in parallel
  const favouriteTvShowQueries = useQueries(
    tvShowIds.map((tvShowId) => {
      return {
        queryKey: ["tvShow", tvShowId],
        queryFn: () => getTvShow(tvShowId.toString()), // Ensure this function fetches TV shows
      };
    })
  );

  // Check if any of the parallel queries are still loading
  const isLoading = favouriteTvShowQueries.find((q) => q.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  // Filtering through the favourites list to display only the TV shows that match the filter criteria
  const allFavourites = favouriteTvShowQueries.map((q) => q.data);
  const displayedTvShows = allFavourites
    ? filterFunction(allFavourites)
    : [];

  // Updating the filter values
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  // Sorting functions
  const sortByDate = (a: BaseTvShowProps, b: BaseTvShowProps) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
  const sortByRating = (a: BaseTvShowProps, b: BaseTvShowProps) => b.vote_average - a.vote_average;
  const sortByPopularity = (a: BaseTvShowProps, b: BaseTvShowProps) => b.popularity - a.popularity;

  return (
    <>
      <PageTemplate
        title="FAVOURITES"
        tvShows={displayedTvShows} // Ensure this prop is handled in your PageTemplate for TV shows
        action={(tvShow) => {
          return (
            <>
              <AddToTvFavouritesIcon {...tvShow} />
              {/*<WriteReview {...tvShow} /> {/* Ensure this component is compatible with TV shows */}
            </>
          );
        }}
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteTvShowsPage;
