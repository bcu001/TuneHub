import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import AdminRoutes from "./guards/AdminRoutes";
import ProtectedRoute from "./guards/ProtectedRoute";
import NotFound from "@/components/common/NotFound";
import AuthLayout from "@/layouts/AuthLayout";
import Layout from "@/layouts/Layout";
import AppLoadingScreen from "@/components/skeletons/AppLoadingSkeleton";

const SongAdminDashboard = lazy(() => import("@/pages/admin/SongAdminDashboardPage"));
const ForgetPasswordPage = lazy(() => import("@/pages/public/ForgetPasswordPage"));
const HomePage = lazy(() => import("@/pages/public/HomePage"));
const LoginPage = lazy(() => import("@/pages/public/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/public/RegisterPage"));
const ResetPasswordPage = lazy(() => import("@/pages/public/ResetPasswordPage"));
const SearchPage = lazy(() => import("@/pages/public/SearchPage"));
const SongDetailPage = lazy(() => import("@/pages/public/SongDetailPage"));
const AlbumDetailPage = lazy(() => import("@/pages/user/AlbumDetailPage"));
const AlbumPage = lazy(() => import("@/pages/user/AlbumPage"));
const LikedSongPage = lazy(() => import("@/pages/user/LikedSongPage"));
const PlaylistCreationPage = lazy(() => import("@/pages/user/PlaylistCreationPage"));
const PlaylistDetailPage = lazy(() => import("@/pages/user/PlaylistDetailPage"));
const PlaylistsPage = lazy(() => import("@/pages/user/PlaylistsPage"));
const SettingPage = lazy(() => import("@/pages/user/SettingPage"));

function AppRoutes() {
  return (
    <Suspense fallback={<AppLoadingScreen/>}>
      <Routes>
        {/* Public routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/songs/:id" element={<SongDetailPage />} />
        </Route>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* User routes */}
          <Route element={<Layout />}>
            <Route path="/albums/:id" element={<AlbumDetailPage />} />
            <Route path="/albums" element={<AlbumPage />} />
            <Route path="/artists/:id" element={<HomePage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/playlists/:id" element={<PlaylistDetailPage />} />
            <Route path="/playlists/create"element={<PlaylistCreationPage />} />
            <Route path="/liked" element={<LikedSongPage />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoutes />}>
            <Route element={<Layout />}>
              <Route path="/admin" element={<SongAdminDashboard />} />
            </Route>
          </Route>
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        {/* Not found */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
