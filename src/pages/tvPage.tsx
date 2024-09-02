import React, { useEffect, useState } from "react";
import TvShowListPageTemplate from "../components/templateTvShowListPage";
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites";
import { Box } from "@mui/material";
import { BaseTvShowProps } from "../types/interfaces";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import SortTvUi from "../components/sortTvUi";
import TvFilterUi, { titleFilter, genreFilter } from "../components/tvFilterUi";
import { DiscoverTvShows } from "../types/interfaces";
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

// Sorting functions
const sortByDate = (a: BaseTvShowProps, b: BaseTvShowProps) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime();
const sortByRating = (a: BaseTvShowProps, b: BaseTvShowProps) => b.vote_average - a.vote_average;
const sortByPopularity = (a: BaseTvShowProps, b: BaseTvShowProps) => b.popularity - a.popularity;

const TV: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fuse, setFuse] = useState<Fuse<BaseTvShowProps> | null>(null);
  const PAGE_SIZE = 20; // Number of TV shows per page

  // Define the range of pages to fetch
  const TOTAL_PAGES_TO_FETCH = 500;
  const pageRange = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) => i + 1);

  // Fetch TV shows
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["discoverTvShows", pageRange],
    () => getTvShows(pageRange),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  useEffect(() => {
    if (data?.results) {
      const fuseInstance = new Fuse(data.results, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.5
      });
      setFuse(fuseInstance);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const defaultFilters = { title: "", genre: "0" };
    const updatedFilterSet = type === "title"
      ? [{ name: "title", value }, { name: "genre", value: defaultFilters.genre }]
      : [{ name: "title", value: defaultFilters.title }, { name: "genre", value }];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1);
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1);
  };

  const tvShows = data ? data.results : [];
  let filteredTvShows = filterFunction(tvShows);

  if (fuse) {
    const titleFilterValue = filterValues[0].value;
    if (titleFilterValue) {
      filteredTvShows = fuse.search(titleFilterValue).map(result => result.item);
    }
  }

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
        action={(tvShow: BaseTvShowProps) => <AddToTvFavouritesIcon {...tvShow} />}
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
            onChange={(_event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default TV;
