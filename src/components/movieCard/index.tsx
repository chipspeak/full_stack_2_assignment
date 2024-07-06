import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces"; 
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const styles = {
  card: {
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  media: {
    height: "100%",
    paddingTop: "150%", // 2:3 aspect ratio
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    textAlign: "center",
    opacity: 0,
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 1,
    },
  },
  iconButton: {
    color: "white",
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites, playlists } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id)) movie.favourite = true;
  if (playlists.find((id) => id === movie.id)) movie.playlist = true;

  // Function to get appropriate icon
  const getIcon = () => {
    if (movie.favourite) {
      return <FavoriteIcon />;
    } else if (movie.playlist) {
      return <PlaylistIcon />;
    }
    return null;
  };

  return (
    <Card sx={styles.card}>
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <Box sx={styles.overlay}>
        <Typography variant="h6">{movie.title}</Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
        <CardActions>
          <IconButton sx={styles.iconButton}>{getIcon()}</IconButton>
          {action(movie)}
          <Link to={`/movies/${movie.id}`}>
            <IconButton sx={styles.iconButton}>
              <Button variant="outlined" size="small" color="primary">
                More Info
              </Button>
            </IconButton>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default MovieCard;
