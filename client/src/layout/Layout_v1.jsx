import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useScroll, motion } from "framer-motion";

// components
import Navbar from "@/components/common/Navbar/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { assets } from "@/assets/assets";

const Layout_v1 = () => {
  // scorll stuff
  const { scrollY } = useScroll();

  return (
    <div className="w-full h-screen relative overflow-y-auto md:flex">
      <aside className="sticky top-0 left-0 hidden md:block">
        <Sidebar />
      </aside>
      <motion.div
        className="block md:hidden "
        style={{
          opacity: scrollY.progress,
        }}
      >
        <Navbar />
      </motion.div>
      <main className="grow">
        <div className="h-screen ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout_v1;
