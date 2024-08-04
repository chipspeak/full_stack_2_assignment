import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import Spinner from '../spinner';

/* This has been modified after deployment as a bug emerged where the user would be redirected 
to the login page even if they were authenticated. This was due to the fact that the AuthContext
was not able to set the token before the protected routing kicked in
I've added a loading state to authContext interface and overall logic and it seems to have rectified the issue 
*/
const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { token, loading } = useContext(AuthContext) || {};
  const location = useLocation();

  // Show a loader or nothing while loading the authentication state
  if (loading) {
    return <Spinner></Spinner>
  }

  // If not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
