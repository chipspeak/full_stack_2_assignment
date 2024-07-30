import { createTheme } from '@mui/material/styles';

// necessary for some elements such as the navbar currently. If I had more time this would be site wide but we'll see.
const theme = createTheme({
  palette: {
    background: {
      default: '#1a1a1a', // Dark background
      paper: '#333333', // Card background or paper color
    },
    text: {
      primary: '#ffffff', // Text color
    },
    primary: {
      main: '#1976d2', // Primary color
      dark: '#115293', // Darker primary color for hover
    },
  },
  components: {
    // Customize MUI components if needed
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#333333', // Match card background
        },
      },
    },
  },
});

export default theme;
