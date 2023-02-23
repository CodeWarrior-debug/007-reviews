import { createContext } from "react";

export const AuthContext = createContext({
    authEmail: "",
    setAuthEmail: () => undefined
})