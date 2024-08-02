import type { Meta, StoryObj } from '@storybook/react';
import ActorDetails from "../components/actorDetails";
import { sampleActor } from "./sampleData";
import { MemoryRouter } from "react-router";
import React from 'react';

const meta = {
  title: 'Home Page/ActorDetails',
  component: ActorDetails,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
} satisfies Meta<typeof ActorDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actor: sampleActor,
  },
};

Default.storyName = "Default";
