import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import "@/global/global.css";
import App from "@/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "@/context/authContext.jsx";
import { MusicPlayerProvider } from "@/context/MusicPlayerContext";

import { GlobalMusicContextProvider } from "./context/GlobalMusicContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <MusicPlayerProvider>
          <GlobalMusicContextProvider>
            <App />
          </GlobalMusicContextProvider>
        </MusicPlayerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
