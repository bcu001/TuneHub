import React from "react";

const Loading = () => {
  return (
    <div id="loading" className="flex justify-center items-center">
      <div className="w-[100px] h-[100px] rounded-full border-[10px] border-grey-500 border-t-purple-500 animate-spin "></div>
    </div>
  );
};

export default Loading;
