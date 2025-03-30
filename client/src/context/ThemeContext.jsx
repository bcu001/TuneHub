import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(()=>{
    const themeName = localStorage.getItem("theme");
    if(themeName) return  themeName;
    return "subtle-prism";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme.toString());
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
