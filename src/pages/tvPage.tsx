import React, { useEffect, useState } from "react";
import TvShowListPageTemplate from "../components/templateTvShowListPage"; // Component for displaying TV shows
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites";
import { Box } from "@mui/material";
import { BaseTvShowProps } from "../types/interfaces";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import SortTvUi from "../components/sortTvUi"; // Component for sorting TV shows
import TvFilterUi, { titleFilter, genreFilter } from "../components/tvFilterUi"; // Component for filtering TV shows
import { DiscoverTvShows } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination"; // Importing pagination component

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

// Sorting functions
const sortByDate = (a: BaseTvShowProps, b: BaseTvShowProps) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
const sortByRating = (a: BaseTvShowProps, b: BaseTvShowProps) => b.vote_average - a.vote_average;
const sortByPopularity = (a: BaseTvShowProps, b: BaseTvShowProps) => b.popularity - a.popularity;

const TV: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 8; // Number of TV shows per page

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch TV shows
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>("discoverTvShows", getTvShows);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = type === "title"
      ? [changedFilter, filterValues[1]]
      : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const tvShows = data ? data.results : [];
  const filteredTvShows = filterFunction(tvShows);

  // Sort TV shows
  const sortedTvShows = [...filteredTvShows].sort((a, b) => {
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

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTvShows = sortedTvShows.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(sortedTvShows.length / PAGE_SIZE);

  return (
    <>
      <TvShowListPageTemplate
        title="DISCOVER TV SHOWS"
        tvShows={paginatedTvShows}
        action={(tvShow: BaseTvShowProps) => {
          return <AddToTvFavouritesIcon {...tvShow} />;
        }}
      />
      <TvFilterUi
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <SortTvUi onSortChange={changeSortOption} />
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

export default TV;
