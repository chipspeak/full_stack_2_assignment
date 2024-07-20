import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { ActorDetailsProps } from "../../types/interfaces";

// Styles for the component
const styles = {
  card: {
    borderRadius: 5,
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    backgroundColor: '#333', 
    color: '#fff', 
    width: '350px', 
    height: 'auto', 
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'space-between', 
  },
  // Forcing the image into the desired aspect ratio
  media: {
    height: 0,
    paddingTop: "150%", // 2:3 aspect ratio
  },
  content: {
    padding: "16px",
    textAlign: "center",
    color: '#fff', 
  },
  scrollableContent: {
    maxHeight: '480px', // Seting a fixed height for scrolling
    overflowY: 'auto', // Enabling vertical scrolling (just because many of the bios can be quite long)
    textAlign: 'left', // Aligning text to the left for better readability (may change or justify at a later point)
  },
  container: {
    marginTop: "20px",
    marginBottom: "60px",
    gap: 4, 
    justifyContent: 'center',
  },
};

interface ActorDetailsComponentProps {
  actor: ActorDetailsProps;
}

const ActorDetails: React.FC<ActorDetailsComponentProps> = ({ actor }) => {
  return (
    <Grid container spacing={4} sx={styles.container}>
      {/* Card 1: Image and Name */}
      <Grid item>
        <Card sx={styles.card}>
          <CardMedia
            sx={styles.media}
            image={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : 'path/to/default-image.jpg' // This is just precautionary, the image should always be available as I've filtered out actors without them from the cast bar
            }
            title={actor.name}
          />
          <CardContent sx={styles.content}>
            <Typography variant="h5" component="div">
              {actor.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2: Biography */}
      <Grid item>
        <Card sx={styles.card}>
          <CardContent sx={{ ...styles.content, ...styles.scrollableContent }}>
            <Typography variant="h6" component="div">
              Biography
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {actor.biography || 'Biography information is not available.' // Again, precautionary as any actors with images likely have bios
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 3: Additional Information */}
      <Grid item>
        <Card sx={styles.card}>
          <CardContent sx={styles.content}>
            <Typography variant="h6" component="div">
              Additional Information
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Known For:</strong> {actor.known_for_department || 'Not Available'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Date of Birth:</strong> {actor.birthday || 'Not Available'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Place of Birth:</strong> {actor.place_of_birth || 'Not Available'}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Popularity:</strong> {actor.popularity ? actor.popularity.toFixed(1) : 'Not Available' // Fixing popularity to 1 decimal place
              }
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ActorDetails;
