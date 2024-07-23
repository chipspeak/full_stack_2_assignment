import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fakeAuth from "../components/fakeAuth";
import { AuthContextInterface } from "../types/interfaces";

// Authcontext based on lecture 4 private routing section
export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const authenticate = async (username: string, password: string) => {
    try {
      const token = await fakeAuth(username, password);
      setToken(token);
      const origin = location.state?.intent?.pathname || '/';
      navigate(origin);
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        signout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
