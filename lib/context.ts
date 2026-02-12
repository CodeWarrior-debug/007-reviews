import { createContext } from "react";

interface AuthContextType {
  authEmail: string;
  setAuthEmail: (email: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  authEmail: "",
  setAuthEmail: () => undefined,
});
