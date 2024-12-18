import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

function Notification({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      {isVisible ? (
        <div
          style={{}}
          className={`relative font-semibold rounded pl-10 px-3 py-2 bg-[var(--primary-color)] text-white`}
        >
          {message}
          <IoMdClose
            className="bg-red-500 rounded p-1 absolute top-2 left-2 cursor-pointer"
            onClick={() => {
              setIsVisible(false);
            }}
            size={25}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Notification;
