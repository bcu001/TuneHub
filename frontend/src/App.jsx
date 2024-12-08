import React from "react";
import Home from "./Pages/home/Home";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from "./Pages/register/Register";
import Login from "./Pages/login/Login";
import Navbar from "./components/navbar/Navbar";
import Ranking from "./Pages/ranking/Ranking";
import Profile from "./Pages/profile/Profile";
import Admin from "./Pages/admin/Admin";
import Contact from "./Pages/contact/Contact";
import Mistake from "./Pages/notFoundPage/NotFoundPage";
import SearchPage from "./Pages/searchpage/SearchPage";

const App = () => {
  const currentUser = true;
  const isCurrentUserAdmin = true;

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const AdminPanel = ({ children }) => {
    if (!isCurrentUserAdmin) {
      return <Navigate to="/" />;
    }
    return children;
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
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/ranking",
          element: <Ranking />,
        },
        {
          path: "/admin",
          element: <AdminPanel><Admin /></AdminPanel>,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/*",
          element: <Mistake />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
