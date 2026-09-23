import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { User } from "@/types/user";

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;

  isAuthenticated: boolean;
  isLoading: boolean;

  signinHandler: (email: string, password: string) => Promise<unknown>;

  signinPending: boolean;

  signupHandler: (
    name: string,
    email: string,
    password: string,
  ) => Promise<unknown>;

  signupPending: boolean;

  signoutHandler: () => Promise<unknown>;
  signoutAllHandler: () => Promise<unknown>;
}

const AuthContext = createContext<AuthContextType|null>(null);

export default AuthContext;
