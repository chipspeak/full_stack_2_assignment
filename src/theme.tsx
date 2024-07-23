// theme.js or theme.ts
import { createTheme } from '@mui/material/styles';

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
