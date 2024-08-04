import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { getTvReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import { TvShowDetailsProps, Review } from "../../types/interfaces"; 
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
    width: "40%",
    backgroundColor: "#1a1a1a", 
    color: "white",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 999,
    overflowY: "auto",
  },
};

const TvReviews: React.FC<TvShowDetailsProps> = (tvShow) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (tvShow.id) {
      getTvReviews(tvShow.id).then((reviews) => {
        setReviews(reviews);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tvShow.id]);

  return (
    <Box sx={styles.sidebar}>
      <Typography variant="h6">Reviews</Typography>
      <TableContainer component={Paper}>
        <Table sx={styles.table} aria-label="reviews table">
          <TableBody>
            {reviews.map((review: Review) => (
              <TableRow key={review.id}>
                <TableCell component="th" scope="row" sx={styles.table}>
                  {review.author}
                </TableCell>
                <TableCell sx={styles.table}>{excerpt(review.content)}</TableCell>
                <TableCell sx={styles.table}>
                  <Link
                    to={`/tvreviews/${review.id}`}
                    state={{
                      review,
                      tvShow,
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

export default TvReviews;
