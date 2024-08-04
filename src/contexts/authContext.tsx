import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { AuthContextInterface } from "../types/interfaces";

/* Auth context based on Supabase authentication 
(mixture of this video: https://www.youtube.com/watch?v=EOppukfgL_o, the auth lab, and https://supabase.com/docs/guides/auth)
*/
export const AuthContext = createContext<AuthContextInterface | null>(null);

// Auth context provider component
const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true); // Track loading state

  // Get the current location and navigate function (for redirecting)
  const location = useLocation();
  const navigate = useNavigate();

  // Function to update token and user based on Supabase session
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
    } finally {
      setLoading(false); // Set loading to false once the session has been checked
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
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error('Authentication error:', (error as Error).message);
    }
  };

  // Function to sign out and clear authentication state
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

  // Initialize authentication state on component mount
  useEffect(() => {
    updateAuthState();
    
    // Subscribe to authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setToken(session.access_token); // Update token
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

  // Provide context values to children components
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        authenticate,
        signout,
        loading, // Provide loading state to the context (this is the resolution to the bug in the protected route component)
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
