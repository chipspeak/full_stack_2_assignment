import type { Meta, StoryObj } from '@storybook/react';
import AdvancedSearchCard from '../components/advancedSearchCard';
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GenreData } from '../types/interfaces';

const theme = createTheme();

// Dummy data for genres
const dummyGenres: GenreData['genres'] = [
  { id: '1', name: 'Action' },
  { id: '2', name: 'Comedy' },
  { id: '3', name: 'Drama' },
  { id: '4', name: 'Fantasy' },
  { id: '5', name: 'Horror' },
];

// Decorators to provide the theme and other necessary context
const decorators = [
  (Story: any) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

const meta = {
  title: 'Search/AdvancedSearchCard',
  component: AdvancedSearchCard,
  decorators,
} satisfies Meta<typeof AdvancedSearchCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default story for the AdvancedSearchCard component
export const Default: Story = {
  render: (args) => {
    // States for the controlled component
    const [media, setMedia] = useState<string>('');  
    const [genre, setGenre] = useState<string>('');  
    const [year, setYear] = useState<string>('');    
    const [rating, setRating] = useState<string>(''); 

    // Function to simulate search submit
    const handleSearchSubmit = () => {
      alert('Search submitted!');
    };

    return (
      <AdvancedSearchCard
        media={media}
        setMedia={setMedia}
        genre={genre}
        setGenre={setGenre}
        year={year}
        setYear={setYear}
        rating={rating}
        setRating={setRating}
        handleSearchSubmit={handleSearchSubmit}
        genres={dummyGenres}
      />
    );
  },
  args: {
    media: '',
    setMedia: (media: string) => {},
    genre: '',
    setGenre: (genre: string) => {},
    year: '',
    setYear: (year: string) => {},
    rating: '',
    setRating: (rating: string) => {},
    handleSearchSubmit: () => {},
    genres: [],
},
};
