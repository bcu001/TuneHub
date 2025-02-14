import { AuthContext } from "@/context/authContext";
import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeOff } from "lucide-react";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";

const themeNames = [];

const Settings = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  // const [vol, setVol] = useState(12);
  const [lang, setLang] = useState("en");
  const { vol, handleVol } = useContext(MusicPlayerContext);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
  };

  const handleLang = (event) => {
    const inputLang = event.target.value;
    setLang(inputLang);
  };

  return (
    <div className="flex  items-center justify-center  h-full">
      <div className="rounded-md shadow-ui p-5 flex flex-col gap-5 w-11/12 md:w-[40%] m-auto text-inherit">
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
              className="overflow-hidden w-[200px] p-2 rounded-md"
              to={"/admin-panel"}
            >
              Access Admin Panel
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div>Theme</div>
          <select
            className="overflow-hidden w-[200px] p-2 rounded-md outline-none "
            name="themeBtn"
            id="themeBtn"
            value={theme}
            onChange={handleThemeChange}
          >
          
          <option  value="bullseye-gradient">Bullseye Gradient</option>
            <option  value="subtle-prism">Subtle Prism</option>
            <option  value="spectrum-gradient">Spectrum Gradient</option>
            <option  value="dragon-scales">Dragon Scales</option>
            <option  value="black-dog">Black Dog</option>
          
          </select>
        </div>
        <div className="flex justify-between items-center">
          <div>Language</div>
          <select
            className=" overflow-hidden w-[200px] p-2 rounded-md"
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
        <div className="flex items-center">
          <div className="h-6 w-6 mr-3">
            {vol > 0 ? <Volume2 /> : <VolumeOff />}
          </div>
          <input
            onChange={handleVol}
            className="w-full mr-3 cursor-pointer"
            type="range"
            name="volSet"
            id="volSet"
            min={0}
            max={100}
            value={vol}
          />
          <p className="text-sm w-12">{`${vol}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
