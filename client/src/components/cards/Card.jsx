import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { assets } from "@/assets/assets";

import { BASE_URL } from "@/global/baseurl";

const Card = ({ song }) => {
  const [songImg, setSongImg] = useState(null);

  useEffect(() => {
    getImage();
  }, []);

  const bufferToURL = (buffer, type) => {
    const blob = new Blob([buffer], { type });
    return URL.createObjectURL(blob);
  };

  const getImage = async () => {
    const id = song.songID;
    console.log("getting image:", id);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/songs/getSongMedia`,
        { songID: id }
      );
      // console.log("songID:", id);
      // console.log("response:", res.data[0]);

      const imageBuffer = res.data[0]?.image?.data; // Access the image data array
      if (!imageBuffer || imageBuffer.length === 0) {
        console.error("No image data found!");
        return;
      }
      // console.log(imageBuffer);

      // // Convert the imageBuffer (array) to a Uint8Array
      // const buffer = new Uint8Array(imageBuffer);
      // console.log("Converted buffer:", buffer);

      const imageUrl = bufferToURL(imageBuffer, "image/jpeg");
      setSongImg(imageUrl); //upadate kar rha hu img src of card!
      // console.log("Image buffer:", imageBuffer);
      // console.log("Buffer length:", imageBuffer.length);


      // // Define the mime type based on your data format, e.g., image/jpeg
      // const mimeType = "image/jpeg"; // Adjust according to your image type
      // const blob = new Blob([buffer], { type: mimeType });
      // console.log("Blob object:", blob);

      // const imageUrl = URL.createObjectURL(blob);
      // console.log("Image URL:", imageUrl);

      // setSongImg(imageUrl); // Update the state to trigger re-render
    } catch (err) {
      console.error("Error fetching song media:", err);
    } finally {
      console.log("getting image done:", id);
    }
  };

  return (
    <div className="aspect-square relative rounded-md overflow-hidden flex items-end text-white">
      <img
        src={songImg || assets.defaultProfile}
        alt=""
        className="w-full h-full absolute top-0 left-0 -z-10 object-cover"
      />
      <div className="px-2 pb-1 bg-[#0000008a] w-full ">
        <div className="truncate text-lg font-bold">{song.songName}</div>
        <div className="truncate">{song.writer}</div>
      </div>
      <Link
        to={`/player/${song.songID}`}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border bg-white text-black p-[6px] rounded-full hover:p-2"
      >
        <Play />
      </Link>
    </div>
  );
};

export default Card;

// <div className="aspect-square relative rounded-md overflow-hidden flex items-end text-white">

//     <img
//       src={assets.bgImage}
//       alt={song.songName}
//       className=" absolute w-full h-full object-cover"
//     />
//   <div className="px-2 pb-1 bg-[#0000008a] w-full ">
//     <div className="truncate text-lg font-bold">{song.songName}</div>
//     <div className="truncate">{song.writer}</div>
//   </div>
//   <Link
//     to={`/player/${song.songID}`}
//     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border bg-white text-black p-[6px] rounded-full hover:p-2"
//   >
//     <Play />
//   </Link>
// </div>
