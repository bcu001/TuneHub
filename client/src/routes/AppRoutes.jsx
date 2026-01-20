import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import AdminRouteProtected from "@/routes/AdminRouteProtected";
import Layout_v2 from "@/layout/Layout_v2";
import Home from "@/pages/home/Home";
import Profile from "@/pages/profile/Profile";
import Album from "@/pages/album/Album";
import Playlist from "@/pages/playlist/Playlist";
import Settings from "@/pages/settings/Settings";
import SearchPage_v2 from "@/pages/search/SearchPage_v2";
import Contact from "@/pages/contact/Contact";
import CategoryPage from "@/pages/categores/CategoryPage";
import AdminPanel from "@/pages/admin/AdminPanel";
import NotFoundPage from "@/pages/notFoundPage/NotFoundPage";
import BaseLayout from "@/layout/BaseLayout";
import Signin from "@/pages/auth/Signin";
import Signup from "@/pages/auth/Signup";
import Test from "@/components/others/Test";
import Song from "@/pages/song/Song";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout_v2 />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/albums" element={<Album />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<SearchPage_v2 />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route
          path="/admin-panel"
          element={
            <AdminRouteProtected>
              <AdminPanel />
            </AdminRouteProtected>
          }
        />
      </Route>

      <Route path="/*" element={<NotFoundPage />} />
      <Route element={<BaseLayout />}>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
