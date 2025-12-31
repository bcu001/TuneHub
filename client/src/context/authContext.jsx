import { BASE_URL } from "@/global/baseurl.js";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function auto_signin() {
      const existToken = localStorage.getItem("token");

      if (!existToken) {
        setIsAuthenticated(false);
        setAuthLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/v2/auth/validate`,
          {
            headers: {
              Authorization: `Bearer ${existToken}`,
            },
          }
        );
        somefn(res.data.data.user, existToken);
        setIsAuthenticated(true);
      } catch (err) {
        somefn(null, null);
        setIsAuthenticated(false);
        setAuthLoading(false);
        return err;
      } 
    }
  }, [currentUser]);

  const somefn = (user, token) => {
    setCurrentUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const signin = async (formData) => {
    const res = await axios.post(`http://localhost:5000/api/v2/auth/signin`, {
      email: formData.email,
      password: formData.password,
    });

    somefn(res.data.data.user, res.data.data.token);

    return res.data;
  };

  const signup = async (formData) => {
    const res = await axios.post(`http://localhost:5000/api/v2/auth/signup`, {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    return res.data;
  };
  const signout = () => {
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signin,
        signup,
        signout,
        isAuthenticated,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
