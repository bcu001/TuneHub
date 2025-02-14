import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

// body ---> overflow hidden

// components
import Navbar from "@/components/common/Navbar/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { assets } from "@/assets/assets";

const MainLayout = () => {
  return (
    <div className="h-full w-full flex ">
      <div className=" m-2 ">
        <Sidebar />
      </div>
      <main className="shadow-ui h-[98vh] my-auto grow overflow-x-hidden min-w-0 overflow-y-auto mr-2 rounded-md">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
