import React from "react";

const AdminPanel = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-5 m-5">
        <div className="w-[200px] h-[200px] bg-green-200 flex items-center justify-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md shadow-black">
          Manage Songs
        </div>
        <div className="w-[200px] h-[200px] bg-green-200 flex items-center justify-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md shadow-black">
          Manage Users
        </div>
        <div className="w-[200px] h-[200px] bg-green-200 flex items-center justify-center rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md shadow-black">
          Manage Report
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
