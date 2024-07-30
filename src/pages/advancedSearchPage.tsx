import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import { useQuery } from 'react-query';
import { getGenres, getSearchResults } from '../api/tmdb-api';
import { BaseMovieProps, GenreData } from '../types/interfaces';
import Spinner from '../components/spinner';
import MovieListPageTemplate from '../components/templateMovieListPage';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import AdvancedSearchCard from '../components/advancedSearchCard';

/* The AdvancedSearchPage component similar functionally to any other list page 
but we conditionally render the list once results is populated i.e a search has occured
*/
const AdvancedSearchPage: React.FC = () => {
  const [genre, setGenre] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [showCard, setShowCard] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch genres
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
  const genres = data?.genres || [];

  // same logic as elsewhere
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  // Fetch search results by passing the genre, year, and rating into the custom discover api call
  const handleSearchSubmit = async () => {
    try {
      const searchResults = await getSearchResults(genre, year, rating);
      setResults(searchResults);
      setShowCard(false); // Hide the card on submit
      setCurrentPage(1); // Reset to the first page when a new search is performed
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Calculate the paginated results (again, same as elsewhere)
  const PAGE_SIZE = 8; 
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedResults = results.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(results.length / PAGE_SIZE);

  return (
    <>
      {results.length > 0 ? (
        <>
          <MovieListPageTemplate
            title="SEARCH RESULTS"
            movies={paginatedResults}
            action={(movie: BaseMovieProps) => {
              return <AddToFavouritesIcon {...movie} />;
            }}
          />
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
