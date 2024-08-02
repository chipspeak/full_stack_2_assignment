import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard";
import {sampleMovie } from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
// import { action } from "@storybook/addon-actions";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import React from 'react';

const meta = {
  title: 'Home Page/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
    movie: sampleMovie,

  }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...sampleMovie, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    movie: sampleNoPoster,
    action: (movie ) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";