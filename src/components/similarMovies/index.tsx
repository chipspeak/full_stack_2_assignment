import React, { useState } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import { BaseMovieProps } from "../../types/interfaces";
import MovieList from "../movieList";

// SimilarMovies component
interface SimilarMoviesProps {
  movies: BaseMovieProps[];
  action: (movie: BaseMovieProps) => React.ReactNode;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, action }) => {
  // State for pagination (again, similar logic as the main pages)
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8; // Number of movies per page

  // Filter out movies without a poster
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);

  // Calculate the start and end index for pagination
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedMovies = moviesWithPoster.slice(startIndex, startIndex + PAGE_SIZE);

  // Calculate total pages based on total movies and page size
  const totalPages = Math.ceil(moviesWithPoster.length / PAGE_SIZE);

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography variant="h4" component="div" sx={{ textAlign: "center", color: "#fff", mb: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
        SIMILAR MOVIES
      </Typography>
      <Grid container spacing={5} sx={{ padding: "30px" }}>
        <MovieList movies={paginatedMovies} action={action} />
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, value) => setCurrentPage(value)}
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
    </Box>
  );
};

export default SimilarMovies;
