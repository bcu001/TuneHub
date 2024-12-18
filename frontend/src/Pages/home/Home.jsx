import React, { useState, useEffect } from "react";
import Card from "../../components/cards/Card";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [featureSongs, setFeatureSongs] = useState([]);

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
    <div className="overflow-auto w-full">
      {/* Featured Song */}
      {/* <div className="mb-8 mr-3 border flex ">
      {(featureSongs &&
            featureSongs.map((song) => (
              <Card
                artist={song.artist}
                imageUrl={song.songImage}
                title={song.songName}
                key={song.songID}
              />
            ))) ||
            "loading..."}
      </div> */}

      {/* Categories */}
      <section className="mr-3 mb-8">
        <h2 className="text-lg font-semibold mb-4 heading-text">
          Select Categories
        </h2>
        <div className="flex gap-5 flex-wrap">
          {[
            "All",
            "Relax",
            "Sad",
            "Party",
            "Romance",
            "Energetic",
            "Jazz",
            "Alternative",
          ].map((category) => (
            <button
              key={category}
              className="px-4 py-2 charcoal-black rounded mb-2 sm:mb-0"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Songs */}
      <section className="mr-3 ">
        <h2 className="text-lg font-semibold mb-4 heading-text">
          Popular Songs
        </h2>
        <div className="flex flex-wrap gap-10 p-3 items-center justify-center">
          {(featureSongs &&
            featureSongs.map((song) => (
              <Card
                artist={song.artist}
                imageUrl={song.songImage}
                title={song.songName}
                key={song.songID}
              />
            ))) ||
            "loading..."}
        </div>
      </section>
    </div>
  );
};

export default Home;
