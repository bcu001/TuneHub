import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminOption = () => {
  useEffect(() => {
    document.title = "TuneHub | Admin Panel";
  }, []);

  return (
    <div>
      <h1 className="luxury-heading text-3xl text-center mb-3 mt-16">Admin Panel</h1>
      <div className="flex justify-center gap-5 ">
        <Link
          to={"user-management"}
          className="rounded-lg py-1 px-3 text-center"
        >
          <button>User Management</button>
        </Link>
        <Link
          to={"content-management"}
          className="rounded-lg py-1 px-3 text-center"
        >
          <button>Content Management</button>
        </Link>
        <Link
          to={"report-management"}
          className="rounded-lg py-1 px-3 text-center"
        >
          <button>Report Management</button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminOption;
