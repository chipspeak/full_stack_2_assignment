import React from "react";
import MovieHeader from "../headerMovie";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative", 
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", // Align children to the bottom to prevent overlap with image center
    padding: "20px",
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background to aid visbilility of details
    borderRadius: "8px",
    padding: "20px",
  },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({
  movie,
  children,
}) => {
  const { data, error, isLoading, isError } = useQuery<
    { posters: MovieImage[]; backdrops: MovieImage[] },
    Error
  >(["images", movie.id], () => getMovieImages(movie.id));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const { backdrops } = data as {
    posters: MovieImage[];
    backdrops: MovieImage[];
  };

  // Randomly select a backdrop image index -> currently not using as some backdrops have text frustratingly 
  const getRandomBackdropIndex = () => {
    return Math.floor(Math.random() * backdrops.length);
  };


  const backdropUrl =
    backdrops.length > 0
      ? `url(https://image.tmdb.org/t/p/original/${backdrops[0].file_path})`
      : "url(https://via.placeholder.com/1920x1080?text=Backdrop+Not+Available)";

  // Set the backdrop as the background image for the page container
  const pageContainerStyle = {
    ...styles.pageContainer,
    backgroundImage: backdropUrl,
  };

  // Intend to add trailer to center gap here
  return (
    <div style={pageContainerStyle}>
      <MovieHeader {...movie} />

      <div style={styles.contentContainer}>
        <div style={styles.detailsContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default TemplateMoviePage;
