import React from "react";
import { useQuery } from "react-query";
import { getMovieCast } from "../../api/tmdb-api";
import { MovieCastMember } from "../../types/interfaces";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CastMembersProps {
  movieId: number; // Passing the movieId as a prop
}

// Styling for the cast members bar
const styles = {
  castContainer: {
    maxWidth: "84%", // May seem a bit arbitrary but it results in an exact number of cast members
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "20px",
  },
  castCard: {
    display: "inline-block",
    margin: "0 10px",
    textAlign: "center",
  },
  castImage: {
    width: "150px",
    height: "225px",
    objectFit: "cover" as React.CSSProperties['objectFit'],
    borderRadius: "8px",
  },
  castName: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Adding text shadow for better visibilty
  },
};

const CastMembers: React.FC<CastMembersProps> = ({ movieId }) => {
  const { data: castData, error: castError, isLoading: castLoading, isError: isCastError } = useQuery<
    { cast: MovieCastMember[] },
    Error
  >(["cast", movieId], () => getMovieCast(movieId));

  // If the cast members are still loading, display a loading message
  if (castLoading) {
    return <div>Loading cast members...</div>;
  }

  // If there is an error loading the cast members, display an error message
  if (isCastError) {
    return <div>Error loading cast members: {castError?.message}</div>;
  }

  // Desctructure the cast members from the data
  const castMembers = castData?.cast ?? [];

  // Filter out cast members without a profile picture to prevent inconsistencies
  const filteredCastMembers = castMembers.filter((castMember) => castMember.profile_path);


  /* Pointing the img tag's source to the cast member's profile picture 
  (It was also possible to add their character as the api returns this but I feel this is more visually pleasing)
  */
  return (
    <Box sx={styles.castContainer}>
      {filteredCastMembers.map((castMember) => (
        <Box key={castMember.id} sx={styles.castCard}>
          {castMember.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
              alt={castMember.name}
              style={styles.castImage}
            />
          ) : (
            <Box sx={styles.castImage}>No Image</Box>
          )}
          <Typography variant="h6" sx={{ ...styles.castName, color: "#fff" }}>
            {castMember.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CastMembers;
