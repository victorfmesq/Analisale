import React, { FC, useMemo, useState, createContext, useEffect } from "react";
import { SessionProviderProps } from "./types";

export const SessionContext = createContext({});

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  //TODO: get localstorage data to check user is already authenticated
  useEffect(() => {
    // setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
