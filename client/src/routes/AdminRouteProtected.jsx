import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const AdminRouteProtected = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser?.role === "admin" ? children : <Navigate to={"/"} />;
};

export default AdminRouteProtected;