import React, { useContext, useState, useEffect } from "react";
import "@/App.css";
// import "@/global/global.css"
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

//Components
import Sidebar from "@/components/common/Sidebar";
import Player from "@/components/musicPlayer/Player";
//pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/home/Home";
import Navbar from "@/components/common/Navbar/Navbar";
import Ranking from "@/pages/ranking/Ranking";
import Profile from "@/pages/profile/Profile";
import AdminOption from "@/pages/admin/AdminOption";
import Contact from "@/pages/contact/Contact";
import Mistake from "@/pages/notFoundPage/NotFoundPage";
import SearchPage from "@/pages/search/Search";
import UserManagement from "@/pages/admin/UserManagement/UserManagement";
import ContentManagement from "@/pages/admin/contentManagement/ContentManagement";
import ReportManagement from "@/pages/admin/reportManagement/ReportManagement";
import Album from "@/pages/album/Album";
import Playlist from "@/pages/playlist/Playlist";

// Layout
import MainLayout from "@/layout/MainLayout";
import Layout_v1 from "@/layout/Layout_v1";

// Context Api
import { AuthContext } from "@/context/authContext";
import { ThemeContext } from "@/context/ThemeContext";
import Settings from "@/pages/settings/Settings";
import HeroSection from "./components/others/HeroSection";

// Test
import Test from "@/components/others/Test";
import Slider from "./components/common/Slider";
import FloatingMusicPlayer from "@/components/musicPlayer/FloatingMusicPlayer";
import Margin from "./test/Margin";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const AdminRouteProtected = ({ children }) => {
    if (currentUser.role === "admin") {
      return children;
    }
    console.log("user is not an admin");
    return <Navigate to="/" />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout_v1 />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/ranking", element: <Ranking /> },
        { path: "/test/:songID", element: <FloatingMusicPlayer /> },
        { path: "/test", element: <Test /> },
        { path: "albums", element: <Album /> },
        { path: "playlist", element: <Playlist /> },
        { path: "/settings", element: <Settings /> },
        { path: "/player/:songID", element: <FloatingMusicPlayer /> },
        {
          path: "/admin-panel",
          element: (
            <AdminRouteProtected>
              <AdminOption />
            </AdminRouteProtected>
          ),
          children: [
            { path: "user-management", element: <UserManagement /> },
            { path: "content-management", element: <ContentManagement /> },
            { path: "report-management", element: <ReportManagement /> },
          ],
        },
        { path: "/contact", element: <Contact /> },
        { path: "/search", element: <SearchPage /> },
        { path: "/*", element: <Mistake /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
