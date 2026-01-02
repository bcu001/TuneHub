
import React from "react";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {

  return (
    <div className="bg-background-dark">
      <Outlet />
    </div>
  );
};

export default BaseLayout;
