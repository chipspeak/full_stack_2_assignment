import React, { useEffect, useState } from "react";
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
import SortMoviesUI from "../components/sortMoviesUi"; // Importing sorting UI component
import Pagination from "@mui/material/Pagination"; // Importing pagination component
import { Box } from "@mui/material"; // Importing Box for pagination styling
import Fuse from "fuse.js";

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

 The above is rendered moot by the use of Fuse but I'm leaving it here for posterity and demonstration of 
 a fairly hacky solution :P

const filterOutDuplicates = (upcomingMovies: BaseMovieProps[], discoveredMovies: BaseMovieProps[]) => {
  const discoveredMovieIds = discoveredMovies.map(movie => movie.id);
  return upcomingMovies.filter(movie => !discoveredMovieIds.includes(movie.id));
};
*/

// Sorting functions
const sortByDate = (a: BaseMovieProps, b: BaseMovieProps) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
const sortByRating = (a: BaseMovieProps, b: BaseMovieProps) => b.vote_average - a.vote_average;
const sortByPopularity = (a: BaseMovieProps, b: BaseMovieProps) => b.popularity - a.popularity;

// Upcoming movies page -> basically the same as the home page but with upcoming movies
const UpcomingMoviesPage: React.FC = () => {
  const [sortOption, setSortOption] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fuse, setFuse] = useState<Fuse<BaseMovieProps> | null>(null);
  const PAGE_SIZE = 8; // Number of movies per page

  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("upcoming", getUpcomingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  console.log("data: ", data);

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Same logic as in the other pages featuring filters (homePage.tsx)
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet = type === "title"
      ? [changedFilter, filterValues[1]]
      : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const changeSortOption = (sort: string) => {
    setSortOption(sort);
    setCurrentPage(1); // Reset to page 1 when sort option changes
  };

  // Destructuring the data for upcoming and discovered movies
  const upcomingMovies = data ? data.results : [];
  let filteredMovies = filterFunction(upcomingMovies);

  // Use Fuse.js for title filtering if fuse is initialized
  if (fuse) {
    const titleFilterValue = filterValues[0].value;
    if (titleFilterValue) {
      filteredMovies = fuse.search(titleFilterValue).map(result => result.item);
    }
  }

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
      <PageTemplate
        title="UPCOMING MOVIES"
        movies={paginatedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToPlaylistIcon {...movie} />
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

export default UpcomingMoviesPage;
