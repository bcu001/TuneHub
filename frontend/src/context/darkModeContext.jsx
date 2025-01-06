import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");

    // Validate and parse the saved mode safely
    if (savedMode === "true") return true;
    if (savedMode === "false") return false;

    return false; // Default to false if invalid or not set
  });

  const toggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
