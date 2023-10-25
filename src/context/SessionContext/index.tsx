import React, { FC, useMemo, useState, createContext } from "react";
import { SessionProviderProps } from "./types";

export const SessionContext = createContext({});

const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const value = useMemo(() => ({}), []);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
