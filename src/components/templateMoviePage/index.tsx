import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getMovieImages, getMovieVideos, getSimilarMovies, getMovieWatchProviders } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, BaseMovieProps, MovieWatchProvidersResponse } from "../../types/interfaces";
import CastMembers from "../castMembers";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import SimilarMovies from "../similarMovies";
import AddToFavouritesIcon from "../cardIcons/addToFavourites";
import JustWatchLogo from "../../images/justwatch-logo.png";

/*
A note on JustWatch, I've attempted to sign up to use their widget but I don't think it's possible
In lieu of that, I've added a link to the JustWatch page for the movie via a png of their logo
I'm generating this url based on their url structure (i.e hyphens instead of whitespace)
As far as I can tell, there's no way to get a direct link to the movie streaming page from the TMDB api so this will have to do
*/

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    position: "relative",
    zIndex: 2,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    padding: "20px",
    maxWidth: "80%",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
  },
  watchProvidersContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  providerLogo: {
    width: "60px",
    margin: "5px",
  },
  justWatchLogo: {
    width: "140px",
    marginTop: "5px",
  },
};

// Template for the movie page
interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
  // Scroll to the top of the page when the component mounts (this ensures no errant page positions after loads from hyperlinks)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Fetch watch providers
  const { data: watchProvidersData, error: watchProvidersError, isLoading: watchProvidersLoading, isError: isWatchProvidersError } = useQuery<
    MovieWatchProvidersResponse,
    Error
  >(["watchProviders", movie.id], () => getMovieWatchProviders(movie.id));

  // Display a spinner while the data is loading
  if (imagesLoading || videosLoading || similarMoviesLoading || watchProvidersLoading) {
    return <Spinner />;
  }

  // Display an error message if there was an error fetching the data
  if (isImagesError) {
    return <h1>{imagesError.message}</h1>;
  }

  // Display an error message if there was an erro fetching video
  if (isVideosError) {
    return <h1>{videosError.message}</h1>;
  }

  // Display an error message if there was an error fetching similar movies
  if (isSimilarMoviesError) {
    return <h1>{similarMoviesError.message}</h1>;
  }

  // Display an error message if there was an error fetching watch providers
  if (isWatchProvidersError) {
    return <h1>{watchProvidersError.message}</h1>;
  }

  // Extract the similar movies from the similarMoviesData object
  const similarMovies = similarMoviesData?.results || [];

  // Extract and filter the watch providers for Ireland. TMDB returns different types of provider. Flatrate is streaming services i.e Netflix etc
  const irelandProviders = watchProvidersData?.results?.IE?.flatrate || [];

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

  /*
  Function to generate a JustWatch URL for the movie (the movie title format needs to have - instead of whitespcae hence the replace)
  This also removes any commas or apostrophes that might cause issues with the url (example: Schindler's List)
  No need to convert case as justwatch seems to handle that itself
  */
  const generateJustWatchUrl = (title: string) => {
    const formattedTitle = title
      // Replace spaces and specific special characters with a hyphen
      .replace(/[^\w\s-]/g, "") // Remove commas, periods, and other special characters
      .replace(/\s+/g, "-");    // Replace spaces with hyphens
    
    return `https://www.justwatch.com/ie/movie/${formattedTitle}`;
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
          {irelandProviders.length > 0 && (
            // Conditional to prevent display of availability text where no providers are returned
            <Box sx={styles.watchProvidersContainer}>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {irelandProviders.map((provider) => (
                  <Box key={provider.provider_id} display="flex" justifyContent="center" alignItems="center" my={1} mx={1}>
                    <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} style={styles.providerLogo} />
                  </Box>
                ))}
              </Box>
              <a href={generateJustWatchUrl(movie.title)} target="_blank" // Specifying the link to be opened in a new tab
              >
                <img src={JustWatchLogo} alt="JustWatch" style={styles.justWatchLogo} />
              </a>
            </Box>
          )}
        </Box>
        <CastMembers movieId={movie.id} />
      </Box>
      <Box sx={styles.similarMoviesContainer}>
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
