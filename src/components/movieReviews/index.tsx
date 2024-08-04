import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { MovieDetailsProps, Review } from "../../types/interfaces"; 
import { Typography } from "@mui/material";

const styles = {
  table: {
    backgroundColor: "#1a1a1a", 
    color: "white",
  },
  sidebar: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: "50%", // This just about catches the full review link too without scrolling
    backgroundColor: "#1a1a1a", 
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 999,
    overflowY: "auto", // Enable scrolling if content exceeds height
  },
};

const MovieReviews: React.FC<MovieDetailsProps> = (movie) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movie.id).then((reviews) => {
      setReviews(reviews);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={styles.sidebar}>
      <Typography>Reviews</Typography>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="reviews table">
          <TableBody>
            {reviews.map((r: Review) => (
              <TableRow key={r.id}>
                <TableCell component="th" scope="row" sx={styles.table}>
                  {r.author}
                </TableCell>
                <TableCell sx={styles.table}>{excerpt(r.content)}</TableCell>
                <TableCell sx={styles.table}>
                  <Link
                    to={`/reviews/${r.id}`}
                    state={{
                      review: r,
                      movie: movie,
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MovieReviews;
