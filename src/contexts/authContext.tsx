import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { AuthContextInterface } from "../types/interfaces";

// Create the Auth Context
export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true); // Loading state

  const location = useLocation();
  const navigate = useNavigate();

  // Function to update token and user
  const updateAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setToken(session.access_token);
        setUser(session.user);
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to get session:', (error as Error).message);
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  const authenticate = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });

      if (error) throw error;

      await updateAuthState();

      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error('Authentication error:', (error as Error).message);
    }
  };

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setToken(null);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', (error as Error).message);
    }
  };

  useEffect(() => {
    updateAuthState();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setToken(session.access_token);
        setUser(session.user);
      } else {
        setToken(null);
        setUser(null);
      }
    });

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
        loading, // Provide loading state
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
