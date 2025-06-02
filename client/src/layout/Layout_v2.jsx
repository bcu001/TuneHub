import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Layout_v2 = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // console.log("isMobile:", isMobile);

  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="border h-full w-full absolute bg-black -z-10 opacity-50 "></div>
      {isMobile ? (
        <>
          {/* Mobile: Navbar + Fullscreen Content */}
          <Navbar />
          <main className="">
            <Outlet />
          </main>
        </>
      ) : (
        <div className="h-screen w-screen flex">
          {/* Desktop: Sidebar + Scrollable Content */}
          <aside className="h-screen sticky top-0 left-0 ">
            <Sidebar />
          </aside>
          <main className="grow overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default Layout_v2;
