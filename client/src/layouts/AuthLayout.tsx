import { Outlet } from 'react-router';

import Navbar from '@/components/Navbar';
import AppSidebar from '@/components/AppSidebar';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

const AuthLayout = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset className="flex min-h-dvh flex-col">
        <Navbar />
        <main className="flex-1 overflow-x-hidden">
          <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AuthLayout;
