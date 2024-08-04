import React, { useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import { GenreData } from '../../types/interfaces';

// Styling for the advanced search card (in keeping with the minimal style and monochrome color scheme)
const styles = {
  card: {
    width: '50%',
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#333',
    color: 'white',
  },
  cardContent: {
    textAlign: 'center',
    mb: 4,
  },
  inputLabel: {
    color: 'white',
    mb: 1,
  },
  select: {
    color: 'white',
    backgroundColor: '#444',
    mb: 2,
  },
  button: {
    backgroundColor: '#ffffff',
    color: '#000000',
    '&:hover': {
      backgroundColor: '#666666',
      color: '#ffffff',
    },
  },
  mandatory: {
    color: 'red', // Color to indicate that a field is mandatory
  }
};

// Props for the advanced search card
interface AdvancedSearchCardProps {
  media: string;
  setMedia: (media: string) => void;
  genre: string;
  setGenre: (genre: string) => void;
  year: string;
  setYear: (year: string) => void;
  rating: string;
  setRating: (rating: string) => void;
  handleSearchSubmit: () => void;
  genres: GenreData['genres'];
}

// The component itself (using the same logic as the filter cards to populate genres via api call from parent component)
const AdvancedSearchCard: React.FC<AdvancedSearchCardProps> = ({
  media,
  setMedia,
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
  handleSearchSubmit,
  genres
}) => {
  const [error, setError] = useState<string | null>(null);
  
  // Options for the genre, rating, and year selects
  const genreOptions = [{ id: "", name: "Select Genre" }, ...(genres || [])];
  const ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const yearOptions = Array.from({ length: 105 }, (_, i) => 2024 - i);

  // Validate the media and proceed with search if valid (we need to ensure that media is selected before proceeding)
  const validateAndSearch = () => {
    if (media === "") {
      setError("Media is required.");
      return;
    }
    setError(null);
    handleSearchSubmit();
  };

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Typography variant="h5" sx={{ mb: '10px' }}>
          Advanced Search
        </Typography>

        {/* The media select */}
        <InputLabel id="media-label" sx={styles.inputLabel}>
          Media
        </InputLabel>
        <FormControl fullWidth>
          <Select
            labelId="media-label"
            id="media-select"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            sx={styles.select}
          >
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="tv">TV Show</MenuItem>
          </Select>
        </FormControl>

        {/* The genre select */}
        <InputLabel id="genre-label" sx={styles.inputLabel}>
          Genre 
        </InputLabel>
        <FormControl fullWidth>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            sx={styles.select}
          >
            {genreOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* The year select */}
        <InputLabel id="year-label" sx={styles.inputLabel}>
          Release Year
        </InputLabel>
        <FormControl fullWidth>
          <Select
            labelId="year-label"
            id="year-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={styles.select}
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* The rating select */}
        <InputLabel id="rating-label" sx={styles.inputLabel}>
          Rating
        </InputLabel>
        <FormControl fullWidth>
          <Select
            labelId="rating-label"
            id="rating-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={styles.select}
          >
            {ratingOptions.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Error message */}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      </CardContent>

      {/* The card's submit button */}
      <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
        <Button
          variant="contained"
          onClick={validateAndSearch}
          sx={styles.button}
        >
          Search
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdvancedSearchCard;
