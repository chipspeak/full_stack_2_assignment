import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useContext(AuthContext) || {};
  const location = useLocation();

  // Show a loader or nothing while loading the authentication state
  if (loading) {
    return <div>Loading...</div>; // Or use a spinner
  }

  // If not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
