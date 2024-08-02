import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { AuthContextInterface } from "../types/interfaces";

/* Auth context based on Supabase authentication 
(mixture of this video: https://www.youtube.com/watch?v=EOppukfgL_o, the auth lab and https://supabase.com/docs/guides/auth)
*/
export const AuthContext = createContext<AuthContextInterface | null>(null);

// Auth context provider
const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 

  // Get the current location and navigate function (for redirecting)
  const location = useLocation();
  const navigate = useNavigate();

  // Function to update token and user (using supabase session object)
  const updateAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setToken(session.access_token); // Set token
        setUser(session.user); // Set user information
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to get session:', (error as Error).message);
      setToken(null);
      setUser(null);
    }
  };

  // Function to authenticate with GitHub OAuth
  const authenticate = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw error;

      // Wait for the authentication process to complete and update auth state
      await updateAuthState();

      // Redirect user to the intended route or default to home
      const origin = location.state?.intent?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error('Authentication error:', (error as Error).message);
    }
  };

  // Function to sign out (same logic as with fake auth where we clear the token and user)
  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // Clear the token and user
      setToken(null);
      setUser(null);
      navigate('/'); // Redirect to the home page or login page after sign out
    } catch (error) {
      console.error('Sign out error:', (error as Error).message);
    }
  };


  // The following were attempts to make unusual mounting and refresh behaviour stop
  useEffect(() => {
    // Initialize authentication state on component mount
    updateAuthState();

    // Subscribe to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setToken(session.access_token);
        setUser(session.user); // Update user information
      } else {
        setToken(null);
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authenticate,
        signout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
