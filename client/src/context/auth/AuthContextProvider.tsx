import AuthContext from "@/context/auth/AuthContext";
import { setAxiosAccessToken } from "@/lib/axios";
import {
  getCurrentUser,
  signIn,
  signOut,
  signOutAll,
  signUp,
} from "@/services/auth/auth.service";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface SignInParams {
  email: string;
  password: string;
}

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { data: userData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const signinMutation = useMutation({
    mutationFn: ({ email, password }: SignInParams) => signIn(email, password),
    onSuccess: (data) => {
      setAccessToken(data?.accessToken ?? null);
      setAxiosAccessToken(data?.accessToken ?? null);
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });
  const signupMutation = useMutation({
    mutationFn: ({ name, email, password }: SignUpParams) =>
      signUp(name, email, password),
  });
  const signoutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setAccessToken(null);
      setAxiosAccessToken(null);
      queryClient.removeQueries({ queryKey: ["authUser"] });
    },
  });
  const signoutAllMutation = useMutation({
    mutationFn: signOutAll,
    onSuccess: () => {
      setAccessToken(null);
      setAxiosAccessToken(null);
      queryClient.removeQueries({ queryKey: ["authUser"] });
    },
  });

  const signinHandler = (email: string, password: string) =>
    signinMutation.mutateAsync({ email, password });
  const signupHandler = (name: string, email: string, password: string) =>
    signupMutation.mutateAsync({ name, email, password });
  const signoutHandler = () => signoutMutation.mutateAsync();
  const signoutAllHandler = () => signoutAllMutation.mutateAsync();

  const user:User = userData?.user ?? null;

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setAccessToken,
        isAuthenticated: !!user,
        isLoading,
        signinHandler,
        signinPending: signinMutation.isPending,
        signupHandler,
        signupPending: signupMutation.isPending,
        signoutHandler,
        signoutAllHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
