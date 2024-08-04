import React, { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import theme from '../theme';

// Largely matching the cards used elsewhere in the app
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
    marginBottom: 1,
  },
  button: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    marginBottom: 1,
  },
  icon: {
    marginRight: 1,
  },
};

// LoginPage component
const LoginPage: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { authenticate } = authContext || {};

  // Function to login via github (this is specified in auth context. Tried adding google but this proved too time consuming)
  const login = async () => {
    if (authenticate) {
      await authenticate();
    }
  };

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Typography sx={{ marginBottom: 2 }}>Welcome to PMDB</Typography>

          <Button
            variant="contained"
            sx={styles.button}
            onClick={() => login()}
          >
            <GitHubIcon sx={styles.icon} />
            Login with GitHub
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
