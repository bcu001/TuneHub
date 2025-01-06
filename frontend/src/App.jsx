import React, { useContext, useState, useEffect } from "react";
import "@/App.css";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

//Components
import Sidebar from "@/components/sidebar/Sidebar";

//Pages
import Login from "@/Pages/login/Login";
import Register from "@/Pages/register/Register";
import Home from "@/Pages/home/Home";
import Navbar from "@/components/navbar/Navbar";
import Ranking from "@/Pages/ranking/Ranking";
import Profile from "@/Pages/profile/Profile";
import AdminOption from "@/Pages/adminPanel/AdminOption";
import Contact from "@/Pages/contact/Contact";
import Mistake from "@/Pages/notFoundPage/NotFoundPage";
import SearchPage from "@/Pages/searchpage/SearchPage";
import UserManagement from "@/Pages/adminPanel/UserManagement/UserManagement";
import ContentManagement from "@/Pages/adminPanel/contentManagement/ContentManagement";
import ReportManagement from "@/Pages/adminPanel/reportManagement/ReportManagement";
import Album from "@/Pages/album/Album";
import Playlist from "@/Pages/playlist/Playlist";

// Context Api
import { AuthContext } from "@/context/authContext";
import { DarkModeContext } from "@/context/darkModeContext";
import Settings from "@/Pages/settings/Settings";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const { darkMode, toggle } = useContext(DarkModeContext);

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [darkMode]);

  const Layout = () => {
    return (
      <div
        className={`theme primary-color flex w-full h-screen transition-all duration-300 gap-3 flex-col md:flex-row text-[var(--text-color)]`}
      >
        {/* Sidebar: Visible on larger screens */}
        <aside className="hidden md:block my-auto">
          <Sidebar />
        </aside>

        {/* Navbar: Visible on smaller screens */}
        <header className="block md:hidden">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="w-full py-4 mr-3">
          <Outlet />
        </main>
      </div>
    );
  };

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
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/ranking", element: <Ranking /> },
        { path: "albums", element: <Album /> },
        { path: "playlist", element: <Playlist /> },
        { path: "/settings", element: <Settings /> },
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
