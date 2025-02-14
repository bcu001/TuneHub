import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import '@/global/global.css';
import App from "@/App.jsx";

// Context
import { ThemeContextProvider } from "@/context/ThemeContext.jsx";
import { AuthContextProvider } from "@/context/authContext.jsx";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicPlayerProvider>
      <ThemeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ThemeContextProvider>
    </MusicPlayerProvider>
  </StrictMode>
);