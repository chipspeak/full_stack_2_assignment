import type { Meta, StoryObj } from '@storybook/react';
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AuthContextProvider from "../contexts/authContext";

// Create a theme to provide to the component
const theme = createTheme();

// I can't get this to work with the AuthContextProvider to demonstrate the authenticated user navbar but I have to move on
const meta = {
  title: 'Header/SiteHeader',
  component: SiteHeader,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <AuthContextProvider> {/* Provide authentication context */}
            {Story()}
          </AuthContextProvider>
        </MemoryRouter>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

// Story for a non-authenticated user
export const Default: Story = {
  args: {},
};

Default.storyName = "Default";