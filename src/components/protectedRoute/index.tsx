import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

// ProtectedRoute component to ensure that only authenticated users can access certain routes (favourite pages)
const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  // If the user is not authenticated, redirect them to the login page
  if (!authContext || !authContext.token) {
    return <Navigate to="/login" replace state={{ intent: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
