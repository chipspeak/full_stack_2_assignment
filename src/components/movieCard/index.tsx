import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const styles = {
  card: {
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 10px 20px rgba(255, 255, 255, 0.7)",
      outline: "2px solid rgba(255, 255, 255, 0.5)", // Add white outline on hover
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
  chip: {
    color: "#ffffff",
    backgroundColor: "transparent",
    margin: "0.5rem",
    border: "2px solid #ffffff",
  },
  iconButton: {
    color: "white",
  },
};

interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}

// Movie card component
const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {

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
        <Grid container justifyContent="center" alignItems="center" spacing={1}>
          <Grid item>
            <Chip
              icon={<CalendarIcon fontSize="small" />}
              label={movie.release_date}
              sx={styles.chip}
            />
          </Grid>
          <Grid item>
            <Chip
              icon={<StarRateIcon fontSize="small" />}
              label={movie.vote_average.toString()}
              sx={styles.chip}
            />
          </Grid>
          <Grid item>
            {action(movie)}
          </Grid>
          <Grid item>
            <Link to={`/movies/${movie.id}`}>
              <IconButton sx={styles.iconButton}>
                <Button variant="outlined" size="small" color="primary">
                  More Info
                </Button>
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default MovieCard;
