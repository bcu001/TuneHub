import Sidebar_v2 from "@/components/common/Sidebar_v2";
import Navbar from "@/components/common/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import GlobalMusicPlayer from "@/components/musicPlayer/GlobalMusicPlayer";

const Layout_v2 = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="h-screen w-screen flex flex-col bg-background-dark">
      <div className="border h-full w-full absolute bg-black -z-10 opacity-50 "></div>
      {isMobile ? (
        <>
          <Navbar />
          <main className="">
            <Outlet />
          </main>
        </>
      ) : (
        <div className="h-screen w-screen flex">
          <aside className="h-screen sticky top-0 left-0 ">
            <Sidebar_v2 />
          </aside>
          <main className="grow overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      )}

      <GlobalMusicPlayer />
    </div>
  );
};

export default Layout_v2;
