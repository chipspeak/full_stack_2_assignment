
import type { Meta } from '@storybook/react';
import MovieList from "../components/movieList";
import { sampleMovie } from "./sampleData";
import { MemoryRouter } from "react-router";

import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";
import { BaseMovieProps } from '../types/interfaces';


const meta = {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
      (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
      (Story) => <MoviesContextProvider><Story /></MoviesContextProvider>,
    ],
    
} satisfies Meta<typeof MovieList>;
export default meta;


export const Basic = () => {
  const movies = [
    { ...sampleMovie, id: 1 },
    { ...sampleMovie, id: 2 },
    { ...sampleMovie, id: 3 },
    { ...sampleMovie, id: 4 },
    { ...sampleMovie, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <MovieList
        movies={movies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />
    </Grid>
  );
};
Basic.storyName = "Default";


