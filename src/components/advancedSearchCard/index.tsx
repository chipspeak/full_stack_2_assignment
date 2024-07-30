import React from 'react';
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
};

/* The props for our component intention is to also provide a media prop i.e movie or tv
the function in api will then handle the logic and make an alternate call for tv
this will hopefully prevent the need for a duplicate page for tv

*/
interface AdvancedSearchCardProps {
  genre: string;
  setGenre: (genre: string) => void;
  year: string;
  setYear: (year: string) => void;
  rating: string;
  setRating: (rating: string) => void;
  handleSearchSubmit: () => void;
  genres: GenreData['genres'];
}

// The component itself (using the same logic as the filter cards to populate genres via api)
const AdvancedSearchCard: React.FC<AdvancedSearchCardProps> = ({
  genre,
  setGenre,
  year,
  setYear,
  rating,
  setRating,
  handleSearchSubmit,
  genres
}) => {
  const genreOptions = [{ id: "", name: "All Genres" }, ...(genres || [])];
  // Rating option between 1 and 10 for the api's 'gte' parameter
  const ratingOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  // Year options from 2024 to 1919 backwards (so that we start the scroll at recent years)
  const yearOptions = Array.from({ length: 105 }, (_, i) => 2024 - i);

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Typography variant="h5" sx={{mb:'10px'}}>
          Advanced Search
        </Typography>
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
      </CardContent>
      {/* The cards submit button */}
      <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearchSubmit}
          sx={styles.button}
        >
          Search
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdvancedSearchCard;
