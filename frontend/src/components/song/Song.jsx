import React, { useRef, useState } from "react";
import { assets } from "@/assets/assets";
// songImage
// songID
// songName
// artist

const Song = ({ songName, artistName, songImage, songID, songUrl }) => {
  const Ralref = useRef();
  const [playing, setPlaying] = useState(false);
  const [changeCardState, setChangeCardState] = useState(false);

  const handleClick = () => {
    playing ? Ralref.current.pause() : Ralref.current.play();
    setPlaying(!playing);
    setChangeCardState(!changeCardState);
  };

  return (
    <div
      id={songID}
      className={`${
        changeCardState
          ? "w-[350px] h-[125px] absolute z-10"
          : "w-[180px] h-[250px] relative justify-center"
      } bg-[#212121] text-white rounded-md p-3 shadow-lg hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer   items-center flex `}
      onClick={handleClick}
    >
      <div
        id="songCard"
        className={`transition-all duration-500 ease-in-out ${
          changeCardState ? "flex gap-3" : "space-y-2"
        }`}
      >
        <img
          src={songImage || assets.logo}
          alt={`${songName} cover`}
          className={`transition-all duration-500 ease-in-out ${
            changeCardState ? "w-[100px] h-[100px]" : "w-[150px] h-[150px]"
          } object-cover rounded-md`}
        />
        <div
          className={`transition-opacity transform duration-500 ease-in-out ${
            changeCardState
              ? "opacity-100 translate-x-0"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="font-bold text-lg truncate">
            {songName || "Song Name"}
          </div>
          <div className="text-gray-400 text-sm truncate">
            {artistName || "Artist Name"}
          </div>
        </div>
      </div>
      <audio ref={Ralref} src={songUrl}></audio>
    </div>
  );
};

export default Song;

//  <div
//     id={songID}
//     className="w-[220px] h-[250px] bg-[#212121] text-white rounded-md p-3 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
//     onClick={handleClick}
//   >
//     <div id="songCard" className="space-y-2">
//       <img
//         src={songImage || assets.logo}
//         alt={`${songName} cover`}
//         className="w-full h-[160px] object-cover rounded-md"
//       />
//       <div>
//         <div className="font-bold text-lg truncate">
//           {songName || "Song Name"}
//         </div>
//         <div className="text-gray-400 text-sm truncate">
//           {artistName || "Artist Name"}
//         </div>
//       </div
//     </div>
//     <audio ref={Ralref} src={songUrl}></audio>
//   </div>

// second part

{
  /* <div
      id={songID}
      className="hover:w-[420px] hover:h-[125px] w-[220px] h-[250px] bg-[#212121] text-white rounded-md p-3 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div
        id="songCard"
        className="transition-all duration-300  space-y-2 hover:flex hover:gap-3"
      >
        <img
          src={songImage || assets.logo}
          alt={`${songName} cover`}
          className="transition-all duration-300  hover:w-[100px] hover:h-[100px] w-full h-[160px] object-cover rounded-md"
        />
        <div>
          <div className="font-bold text-lg truncate">
            {songName || "Song Name"}
          </div>
          <div className="text-gray-400 text-sm truncate">
            {artistName || "Artist Name"}
          </div>
        </div>
      </div>
      <audio ref={Ralref} src={songUrl}></audio>
    </div> */
}

// third part with state change
{
  /* <div
      id={songID}
      className={`${
        changeCardState ? "w-[420px] h-[125px]" : "w-[220px] h-[250px]"
      }  bg-[#212121] text-white rounded-md p-3 shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer`}
      onClick={handleClick}
    >
      <div
        id="songCard"
        className={`transition-all duration-300 ease-in-out space-y-2 ${
          changeCardState ? "flex gap-3" : ""
        }`}
      >
        <img
          src={songImage || assets.logo}
          alt={`${songName} cover`}
          className={`transition-all duration-300 ease-in-out ${
            changeCardState ? "w-[100px] h-[100px] " : "w-full h-[160px]"
          }  object-cover rounded-md`}
        />
        <div>
          <div className="font-bold text-lg truncate">
            {songName || "Song Name"}
          </div>
          <div className="text-gray-400 text-sm truncate">
            {artistName || "Artist Name"}
          </div>
        </div>
      </div>
      <audio ref={Ralref} src={songUrl}></audio>
    </div> */
}
