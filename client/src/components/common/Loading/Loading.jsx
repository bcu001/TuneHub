import React from "react";
import "./Loading.css";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <section className=" h-full w-full flex items-center justify-center ">
      <div className="loader">
        <div className="box">
          <div className="logo text-white">
            <Loader/>
          </div>
        </div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
        <div className="box"></div>
      </div>
    </section>
  );
};

export default Loading;
