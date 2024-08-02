import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/authContext";

// LogoutPage component
const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { signout } = authContext || {};

  // Function to logout (drawn from the AuthContext)
  useEffect(() => {
    if (signout) {
      signout();
      navigate('/');
    }
  }, [signout, navigate]);

  return null; // No need to render any UI as we're redirecting to the home page after logging out
};

export default LogoutPage;
