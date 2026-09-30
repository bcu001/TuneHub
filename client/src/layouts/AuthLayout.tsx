import { Outlet } from "react-router";

import Navbar from "@/components/Navbar";
import AppSidebar from "@/components/AppSidebar";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const AuthLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthLayout;
