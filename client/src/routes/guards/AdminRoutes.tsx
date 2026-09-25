import useAuth from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router";

const AdminRoutes =()=>{
    const {user} = useAuth();

    return user?.role === 'admin' ? <Outlet/> : <Navigate to={"/"}/>
}

export default AdminRoutes;