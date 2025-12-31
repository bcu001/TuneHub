import React, { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout_v2 from "@/layout/Layout_v2";

import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Profile from "@/pages/profile/Profile";
import Settings from "@/pages/settings/Settings";
import Contact from "@/pages/contact/Contact";
import SearchPage from "@/pages/search/Search";
import Album from "@/pages/album/Album";
import Playlist from "@/pages/playlist/Playlist";
import CategoryPage from "../pages/categores/CategoryPage";
import Mistake from "@/pages/notFoundPage/NotFoundPage";
import AdminPanel from "@/pages/admin/AdminPanel";

import { AuthContext } from "@/context/authContext";
import ProtectedRoute from "@/routes/ProtectedRoute"

const AdminRouteProtected = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser?.role === "admin" ? children : <Navigate to="/" />;
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: (() => {
      return (
        <ProtectedRoute>
          <Layout_v2 />
        </ProtectedRoute>
      );
    })(),
    children: [
      { path: "/", element: <Home /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/albums", element: <Album /> },
      { path: "/playlist", element: <Playlist /> },
      { path: "/settings", element: <Settings /> },
      { path: "/contact", element: <Contact /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/category/:category", element: <CategoryPage /> }, // ✅ Add Category Page Route
      {
        path: "/admin-panel",
        element: (
          <AdminRouteProtected>
            <AdminPanel />
          </AdminRouteProtected>
        ),
      },
      { path: "/*", element: <Mistake /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {path:"/test", element: <Home/>}
]);
