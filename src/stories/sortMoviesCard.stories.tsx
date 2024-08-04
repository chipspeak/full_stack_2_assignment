import type { Meta, StoryObj } from '@storybook/react';
import SortMoviesCard from "../components/sortMoviesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const meta: Meta<typeof SortMoviesCard> = {
  title: 'Home Page/SortMoviesCard',
  component: SortMoviesCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    (Story) => <QueryClientProvider client={queryClient}><Story /></QueryClientProvider>,
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onSortChange: action("sort option changed"),
    sortOption: "none",
  },
};
Basic.storyName = "Default";

export const WithRatingSort: Story = {
  args: {
    onSortChange: action("sort option changed"),
    sortOption: "rating",
  },
};
WithRatingSort.storyName = "With Rating Sort";

export const WithPopularitySort: Story = {
  args: {
    onSortChange: action("sort option changed"),
    sortOption: "popularity",
  },
};
WithPopularitySort.storyName = "With Popularity Sort";
