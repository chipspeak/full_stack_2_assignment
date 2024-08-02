import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import { sampleMovie } from "./sampleData";

const meta: Meta<typeof MovieDetails> = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => (
            <div style={{ padding: '3rem', backgroundColor: '#000' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: sampleMovie,
};
