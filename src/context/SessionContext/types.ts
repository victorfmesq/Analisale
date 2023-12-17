export interface SessionProviderProps {
  children: React.ReactNode;
}

export interface SessionContextProps {
  isAuthenticated: boolean;
  login: (login: string, passord: string) => Promise<void>;
  logout: () => void;
}
