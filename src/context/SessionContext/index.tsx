import React, { FC, useMemo, useState, createContext, useEffect } from "react";
import { SessionProviderProps } from "./types";
import api from "../../services/api";

export const SessionContext = createContext({});

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${JSON.parse(token)}`;
      setIsAuthenticated(true);
    }

    setIsLoggingIn(false);
  }, []);

  useEffect(() => {
    console.log("isAuthenticated :>> ", isAuthenticated);
  }, [isAuthenticated]);

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { token },
      } = await api.post("login", {
        email: email,
        password: password,
      });

      setIsAuthenticated(true);

      localStorage.setItem("accessToken", JSON.stringify(token));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setIsLoggingIn(false);
    } catch (err) {
      throw new Error(`${err}`);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);

    api.defaults.headers.common.Authorization = undefined;

    localStorage.removeItem("accessToken");
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  );

  if (isLoggingIn) return <div>...loading</div>;

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
