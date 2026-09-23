import useAuth from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router";

const ProtectedRoute =()=>{
    const {isAuthenticated} = useAuth();

    return isAuthenticated ? <Outlet/> : <Navigate to={"/"}/>
}

export default ProtectedRoute;