import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { useQueries } from 'react-query';
import { getGenres, getTvGenres, getSearchResults } from '../api/tmdb-api';
import { BaseMovieProps, BaseTvShowProps } from '../types/interfaces';
import MovieListPageTemplate from '../components/templateMovieListPage';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import AddToTvFavouritesIcon from "../components/cardIcons/addToTvFavourites";
import AdvancedSearchCard from '../components/advancedSearchCard';
import TVShowListPageTemplate from '../components/templateTvShowListPage';

// The advanced search page (using the advanced search card component to handle the search criteria)
const AdvancedSearchPage: React.FC = () => {
  const [media, setMedia] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [showCard, setShowCard] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch genres based on media type (doing this because tv and movie genres are not 1-2-1 so we need some conditional logic)
  const [{ data: movieGenresData }, { data: tvGenresData }] = useQueries([
    {
      queryKey: ['movieGenres'],
      queryFn: getGenres,
      enabled: media === '' || media === 'movie', // Only fetch if media is movie or not set
    },
    {
      queryKey: ['tvGenres'],
      queryFn: getTvGenres,
      enabled: media === '' || media === 'tv', // Only fetch if media is tv or not set
    }
  ]);

  // This is the logic to determine which genres to use based on the media type
  const genres = media === 'tv' ? tvGenresData?.genres || [] : movieGenresData?.genres || [];

  // Handle search submission (fetch results based on search criteria and set the results state)
  const handleSearchSubmit = async () => {
    try {
      // Passing the results to the custom api call to get the search results
      const searchResults = await getSearchResults(media, genre, year, rating);
      setResults(searchResults);
      setShowCard(false); // Hide the card on submit (results will be displayed instead)
      setCurrentPage(1); // Reset to the first page when a new search is performed
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Calculate paginated results (same logic as various other pages)
  const PAGE_SIZE = 8;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedResults = results.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);


  // Using the logic mentioned above to render the correct list component based on the media type
  return (
    <>
      {results.length > 0 ? (
        <>
          {media === 'movie' ? (
            <MovieListPageTemplate
              title="SEARCH RESULTS"
              movies={paginatedResults}
              action={(movie: BaseMovieProps) => {
                return <AddToFavouritesIcon {...movie} />;
              }}
            />
          ) : media === 'tv' ? (
            <TVShowListPageTemplate
              title="SEARCH RESULTS"
              tvShows={paginatedResults}
              action={(show: BaseTvShowProps) => {
                return <AddToTvFavouritesIcon {...show} />;
              }}
            />
          ) : null}

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
      ) : (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '75vh',
          bgcolor: '#1a1a1a',
          padding: 2,
        }}>
          <AdvancedSearchCard
            media={media}
            setMedia={setMedia}
            genre={genre}
            setGenre={setGenre}
            year={year}
            setYear={setYear}
            rating={rating}
            setRating={setRating}
            handleSearchSubmit={handleSearchSubmit}
            genres={genres}
          />
        </Box>
      )}
    </>
  );
};

export default AdvancedSearchPage;
