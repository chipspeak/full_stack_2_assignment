import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Card, CardContent, Typography, Button, Box, useTheme } from '@mui/material';
import theme from '../theme';

/* Styles for button (trying to get this to work led to the discovery of the need for the useTheme import)
This may in turn lead to an implementaion of a dark/light theme if I have time and this is similar to svelte
*/
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '75vh',
    bgcolor: theme.palette.background.default,
    padding: 2,
  },
  card: {
    maxWidth: 400,
    borderRadius: 5,
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(255, 255, 255, 0.7)',
      outline: '2px solid rgba(255, 255, 255, 0.5)',
    },
  },
  cardContent: {
    textAlign: 'center',
  },
  title: {
    variant: 'h5',
    component: 'div',
    gutterBottom: true,
  },
  description: {
    variant: 'body2',
    color: 'textPrimary',
    gutterBottom: true,
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
};

// LoginPage component
const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};

  // Login function which relates to the fakeAuth function from its respective component
  const login = () => {
    const password = Math.random().toString(36).substring(7);
    authenticate && authenticate('user1', password);
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Typography>
            Login Page
          </Typography>
          <Typography sx={styles.description}>
            Click the button to login
          </Typography>
          <Button
            variant="contained"
            sx={styles.button}
            onClick={login}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
