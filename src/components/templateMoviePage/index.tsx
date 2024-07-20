import React from "react";
import { useQuery } from "react-query";
import { getMovieImages, getMovieVideos, getSimilarMovies } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, BaseMovieProps } from "../../types/interfaces";
import CastMembers from "../castMembers";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import SimilarMovies from "../similarMovies"; 
import AddToFavouritesIcon from "../cardIcons/addToFavourites"; 

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative", // Ensure the container is positioned relative to handle the content positioning
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative", // Ensure this container has position relative
    zIndex: 2, // Ensure content is above the backdrop
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%", // Ensure the container takes full height if needed
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Setting it to slightly more opaque. I'm back and forth on this one
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "80%",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding text shadow
  },
  trailerContainer: {
    width: "100%",
    maxWidth: "1000px",
    aspectRatio: "16/9",
    marginBottom: "50px",
    border: "none",
  },
  similarMoviesContainer: {
    width: "100%",
    padding: "20px",
  },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {

  // Fetch movies and their respective images/backdrops
  const { data: imagesData, error: imagesError, isLoading: imagesLoading, isError: isImagesError } = useQuery<
    { posters: MovieImage[]; backdrops: MovieImage[] },
    Error
  >(["images", movie.id], () => getMovieImages(movie.id));

  // Pass the movie id to the api to fetch its videos
  const { data: videosData, error: videosError, isLoading: videosLoading, isError: isVideosError } = useQuery<
    { results: { key: string; site: string; type: string }[] },
    Error
  >(["videos", movie.id], () => getMovieVideos(movie.id));

  // Pass the movie id to the api to fetch its similar movies (for use in another movie list component after the cast bar)
  const { data: similarMoviesData, error: similarMoviesError, isLoading: similarMoviesLoading, isError: isSimilarMoviesError } = useQuery<
    { results: BaseMovieProps[] },
    Error
  >(["similarMovies", movie.id], () => getSimilarMovies(movie.id));    

  // Display a spinner while the data is loading
  if (imagesLoading || videosLoading || similarMoviesLoading) {
    return <Spinner />;
  }

  // Display an error message if there was an error fetching the data
  if (isImagesError) {
    return <h1>{imagesError.message}</h1>;
  }

  if (isVideosError) {
    return <h1>{videosError.message}</h1>;
  }

  if (isSimilarMoviesError) {
    return <h1>{similarMoviesError.message}</h1>;
  }

  const similarMovies = similarMoviesData?.results || [];

  // Destructure the imagesData object to get the posters and backdrops (I'm not using posters due to the design of the page but am leaving it here)
  const { backdrops } = imagesData as {
    posters: MovieImage[];
    backdrops: MovieImage[];
  };

  // Find the trailer video in the videosData object by filtering by video type and using youtube as the site for ease of embedding
  const trailer = videosData?.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

  /* Set the backdrop image for the content container (I'm specifically using the first element as some seems to feature text) 
  If there are no backdrops available, use a placeholder image
  */
  const backdropUrl =
    backdrops.length > 0
      ? `url(https://image.tmdb.org/t/p/original/${backdrops[0].file_path})`
      : "url(https://via.placeholder.com/1920x1080?text=Backdrop+Not+Available)";

  // Style for the content container
  const contentContainerStyle = {
    ...styles.contentContainer,
    backgroundImage: backdropUrl,
  };

  // Return the page container with the trailer, movie details, and cast members
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={contentContainerStyle}>
        {trailer && (
          <Box sx={styles.trailerContainer}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }} //this seems to be the only way I can remove the iframe border
            />
          </Box>
        )}
        <Box sx={styles.detailsContainer}>
          {children}
        </Box>
        <CastMembers movieId={movie.id} />
      </Box>
      <Box sx={styles.similarMoviesContainer} // Adding a conditional in case there are no similar movies listed
      >
        {similarMovies.length > 0 && (
        <SimilarMovies 
          movies={similarMovies} 
          action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />} 
        />
        )}
      </Box>
    </Box>
  );
};

export default TemplateMoviePage;
