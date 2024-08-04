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
  const PAGE_SIZE = 8; // Number of TV shows per page

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch TV shows
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>("discoverTvShows", getTvShows);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  // Using useffect to initialize the fuse instance when the data is loaded (this is the data fuse will refer to)
  useEffect(() => {
    if (data?.results) {
      const fuseInstance = new Fuse(data.results, {
        keys: ['name'],
        includeScore: true,
        threshold: 0.5 // Adjust the threshold for fuzzy matching
      });
      setFuse(fuseInstance);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  /* Modified to return to default on a value chanege to prevent conflicts due to fuzzy search data structure
  Because fuzzy relies on the full data returned by the api and not an array of shows per se
  It won't perform the search on the filtered array so I'm preventing the user from trying this.
  When a search occur, genre returns to all, when a genre change occurs, search is rendered blank.
  */
  const changeFilterValues = (type: string, value: string) => {
    const defaultFilters = {
      title: "", // Default value for title filter
      genre: "0", // Default value for genre filter
    };
    const updatedFilterSet = type === "title"
      ? [{ name: "title", value: value }, { name: "genre", value: defaultFilters.genre }]
      : [{ name: "title", value: defaultFilters.title }, { name: "genre", value: value }];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1); // Reset to first page when filters change (this aids user legibility as the first page will always be shown thus reflecting the results)
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  const tvShows = data ? data.results : [];
  let filteredTvShows = filterFunction(tvShows);

  // Use Fuse.js for title filtering if fuse is initialized
  if (fuse) {
    const titleFilterValue = filterValues[0].value;
    if (titleFilterValue) {
      filteredTvShows = fuse.search(titleFilterValue).map(result => result.item);
    }
  }

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

  console.log("TV shows", paginatedTvShows);

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
            onChange={(_event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default TV;
