import React, { useState, useEffect } from "react";
import Card from "@/components/cards/Card";
import axios from "axios";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const songRank = [
  { rank: 1, title: "song 1", artist: "artist 43", likes: 1724 },
  { rank: 2, title: "song 2", artist: "artist 18", likes: 4407 },
  { rank: 3, title: "song 3", artist: "artist 25", likes: 991 },
  { rank: 4, title: "song 4", artist: "artist 27", likes: 3471 },
  { rank: 5, title: "song 5", artist: "artist 44", likes: 2438 },
];

const Home = () => {
  const [featureSongs, setFeatureSongs] = useState(null);

  useEffect(() => {
    handleFeatureSongs();
  }, []);

  const handleFeatureSongs = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/songs/featuredSongs"
    );
    const data = res.data;
    setFeatureSongs(data);
  };

  return (
    <div className="overflow-auto md:w-full w-95 m-auto border rounded-md p-5 h-full shadow-lg ">
      {/* Top Ranked Songs */}
      <section className="mr-3 mb-8">
        <h2 className="text-lg font-semibold mb-4 heading-text">
          Top Ranked Songs
        </h2>
        <div className="grid grid-cols-4 border-b-2 p-4">
          <div>Rank</div>
          <div>Title</div>
          <div>Artist</div>
          <div>Likes</div>
        </div>
        <div className="">
          {songRank.map((s, i) => (
            <div
              key={s.rank}
              className="grid grid-cols-4 border-b-2 p-4 hover:bg-[#b8d9a8] hover:text-black cursor-pointer"
            >
              <div>{s.rank}</div>
              <div className="w-14 sm:w-fit truncate">{s.title}</div>
              <div className="w-14 sm:w-fit truncate">{s.artist}</div>
              <div className="flex gap-2 items-center">
                <Heart className="text-[#f53855]" size={20} />
                <span>{s.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full  flex justify-end">
          <Link
            className="hover:text-lg hover:text-[var(--primary-color)] transition-all duration-300 ease-in-out"
            to={"/ranking"}
          >
            See More
          </Link>
        </div>
      </section>

      {/* Recent Songs*/}
      <section className="mr-3">
        <h2 className="text-lg font-semibold mb-4 heading-text">
          Recent Songs
        </h2>
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {featureSongs ? (
            featureSongs.length > 0 ? (
              featureSongs.map((song) => (
                <Card
                  artist={song.artist}
                  imageUrl={song.songImage}
                  title={song.songName}
                  key={song.songID}
                />
              ))
            ) : (
              <p>No songs found.</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
