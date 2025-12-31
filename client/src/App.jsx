import React from "react";
import "@/App.css";
import {  RouterProvider } from "react-router-dom";

// Routes & Protected Routes
import { router } from "@/routes/routes"; // Moved routes to a separate file

const App = () => {

  return <RouterProvider router={router} />;
};

export default App;
