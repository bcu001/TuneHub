import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "@/global/global.css";
import App from "@/App.jsx";

// Context
import { AuthContextProvider } from "@/context/authContext.jsx";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <MusicPlayerProvider>
        <App />
      </MusicPlayerProvider>
    </AuthContextProvider>
  </StrictMode>
);
