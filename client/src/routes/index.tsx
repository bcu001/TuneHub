import NotFound from "@/components/common/NotFound";
import HomePage from "@/pages/public/HomePage";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./guards/ProtectedRoute";
import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/public/LoginPage";
import RegisterPage from "@/pages/public/RegisterPage";
import PlaylistsPage from "@/pages/user/PlaylistsPage";
import PlaylistDetailPage from "@/pages/user/PlaylistDetailPage";
import AlbumPage from "@/pages/user/AlbumPage";
import AlbumDetailPage from "@/pages/user/AlbumDetailPage";
import SearchPage from "@/pages/public/SearchPage";
import SongDetailPage from "@/pages/public/SongDetailPage";
import SongAdminDashboard from "@/pages/admin/SongAdminDashboardPage";
import AdminRoutes from "./guards/AdminRoutes";
import AuthLayout from "@/layouts/AuthLayout";
import ResetPasswordPage from "@/pages/public/ResetPasswordPage";
import ForgetPasswordPage from "@/pages/public/ForgetPasswordPage";
import LikedSongPage from "@/pages/user/LikedSongPage";

function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/songs/:id" element={<SongDetailPage />} />
      </Route>

      {/* login routes */}
      <Route element={<ProtectedRoute />}>
        {/* user routes */}
        <Route element={<Layout />}>
          <Route path="/albums/:id" element={<AlbumDetailPage />} />
          <Route path="/albums" element={<AlbumPage />} />
          <Route path="/artists/:id" element={<HomePage />} />
          <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/liked" element={<LikedSongPage />} />
        </Route>

        {/* admin routes */}
        <Route element={<AdminRoutes />}>
          <Route element={<Layout />}>
            <Route path="/admin" element={<SongAdminDashboard />} />
          </Route>
        </Route>
      </Route>

      {/* pulbic but diff layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
      </Route>

      {/* not found routes */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
