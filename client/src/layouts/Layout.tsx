import { Outlet } from "react-router";

import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";
import BottomPlayer from "@/components/BottomPlayer";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="p-4 border">
            <Outlet />
          </div>
        </main>
        <BottomPlayer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
