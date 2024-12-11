import React from "react";
import { assets } from "../../assets/assets";
import FeatureCard from "../../components/cards/FeatureSong";
import { v4 as uuidv4 } from "uuid";
import Card from "../../components/cards/Card";
import Carousel from "../../components/carousel/Carousel";

const Home = () => {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://imgs.search.brave.com/2wgfiuMJRuQF0wud6vDoW7bTPInTJqMpL_Cro_10ONk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/OTFkV2U1c3FlSEwu/anBn" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg" />
      ),
    },
  ];
  return (
    <div className="overflow-auto">
      {/* Featured Song */}
      <section className="mr-3">
        <div className="flex justify-center items-center">
          <Carousel
            cards={cards}
            height="420px"
            width="50%"
            margin="0 auto"
            offset={2}
            showArrows={false}
          />
        </div>
      </section>

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
      <section className="mr-3">
        <h2 className="text-lg font-semibold mb-4 heading-text">
          Popular Songs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { title: "Golden Days", artist: "Fela Carter" },
            { title: "Fading Horizon", artist: "Ida Hart" },
            { title: "Waves of Time", artist: "Lana Rivers" },
            { title: "Electric Dreams", artist: "Ida Lovell" },
            { title: "Shadows & Light", artist: "Ryan Miles" },
            { title: "Electric Dreams", artist: "Ida Lovell" },
            { title: "Shadows & Light", artist: "Ryan Miles" },
            { title: "Electric Dreams", artist: "Ida Lovell" },
            { title: "Shadows & Light", artist: "Ryan Miles" },
            { title: "Electric Dreams", artist: "Ida Lovell" },
            { title: "Shadows & Light", artist: "Ryan Miles" },
            { title: "Electric Dreams", artist: "Ida Lovell" },
            { title: "Shadows & Light", artist: "Ryan Miles" },
          ].map((song, idx) => (
            <div
              key={idx}
              className="w-full h-44 charcoal-black rounded-lg flex flex-col items-center justify-end text-center p-4"
            >
              <div
                className="w-full h-24 bg-cover bg-center rounded mb-2"
                style={{ backgroundImage: "url('/path-to-song-image.jpg')" }}
              ></div>
              <h3 className="text-sm font-semibold">{song.title}</h3>
              <p className="text-xs">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
