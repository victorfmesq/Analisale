export interface SessionProviderProps {
  children: React.ReactNode;
}

export interface SessionContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
