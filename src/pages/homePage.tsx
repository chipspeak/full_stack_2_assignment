import React, { useEffect, useState } from "react";
import MovieListPageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { Box } from "@mui/material";
import { BaseMovieProps } from "../types/interfaces";
import { getMovies } from "../api/tmdb-api";
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

// Sorting functions
const sortByDate = (a: BaseMovieProps, b: BaseMovieProps) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
const sortByRating = (a: BaseMovieProps, b: BaseMovieProps) => b.vote_average - a.vote_average;
const sortByPopularity = (a: BaseMovieProps, b: BaseMovieProps) => b.popularity - a.popularity;

const HomePage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fuse, setFuse] = useState<Fuse<BaseMovieProps> | null>(null);
  const PAGE_SIZE = 20;

  // Define the range of pages to fetch
  const TOTAL_PAGES_TO_FETCH = 500; // Number of pages to fetch (can adjust as needed)
  const pageRange = Array.from({ length: TOTAL_PAGES_TO_FETCH }, (_, i) => i + 1);

  // Fetch movies
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", pageRange],
    () => getMovies(pageRange),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  useEffect(() => {
    if (data?.results) {
      const fuseInstance = new Fuse(data.results, {
        keys: ['title'],
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

  const movies = data ? data.results : [];
  let filteredMovies = filterFunction(movies);

  if (fuse) {
    const titleFilterValue = filterValues[0].value;
    if (titleFilterValue) {
      filteredMovies = fuse.search(titleFilterValue).map(result => result.item);
    }
  }

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortOption) {
      case "none": return 0;
      case "date": return sortByDate(a, b);
      case "rating": return sortByRating(a, b);
      case "popularity": return sortByPopularity(a, b);
      default: return 0;
    }
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedMovies = sortedMovies.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(sortedMovies.length / PAGE_SIZE);

  return (
    <>
      <MovieListPageTemplate
        title="DISCOVER MOVIES"
        movies={paginatedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
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
            onChange={(_event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default HomePage;
