import react, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/authContext";
import Loading from "@/components/common/Loading2";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  if(authLoading){
    return <Loading/>
  }

  if(!isAuthenticated){
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
