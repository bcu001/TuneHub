import { AuthContext } from "@/context/authContext";
import { DarkModeContext } from "@/context/darkModeContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [vol, setVol] = useState(12);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [darkMode]);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setDarkMode(selectedTheme === "dark");
  };

  const handleVolume = (event) => {
    const inputVol = event.target.value;
    setVol(inputVol);
  };

  const handleLang = (event) => {
    const inputLang = event.target.value;
    setLang(inputLang);
  };

  return (
    <div className="border rounded-md shadow-lg p-5 flex flex-col gap-5 md:w-full w-11/12 m-auto">
      <div>
        <h1 className="font-bold">Settings</h1>
        <span className="text-sm">
          Manage your app preferences and account settings
        </span>
      </div>
      {currentUser?.role === "admin" && (
        <div className="flex justify-between items-center">
          <div>Admin</div>
          <Link
            className="bg-[var(--primary-color)] overflow-hidden w-[200px] p-2 rounded-md"
            to={"/admin-panel"}
          >
            Access Admin Panel
          </Link>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>Theme</div>
        <select
          className="bg-[var(--primary-color)] overflow-hidden w-[200px] p-2 rounded-md"
          name="themeBtn"
          id="themeBtn"
          value={darkMode ? "dark" : "light"}
          onChange={handleThemeChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
        <div>Language</div>
        <select
          className="bg-[var(--primary-color)] overflow-hidden w-[200px] p-2 rounded-md"
          name="langBtn"
          id="langBtn"
          value={lang}
          onChange={handleLang}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>
      <div>
        <div>Default Volume</div>
        <input
          className="w-full h-8"
          type="range"
          min={0}
          max={100}
          value={vol}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default Settings;
