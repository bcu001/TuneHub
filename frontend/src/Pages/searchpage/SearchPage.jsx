import React, { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/cards/Card";

const resultList = [
  {
    songID: 1,
    songName: "Eternal Bliss",
    duration: "3:45",
    songImage: "https://example.com/images/eternal_bliss.jpg",
    artist: "John Harmony",
    writer: "Lila Pen",
    releaseDate: "2024-01-01",
    songURL: "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    songID: 2,
    songName: "Nightfall Symphony",
    duration: "4:12",
    songImage: "https://example.com/images/nightfall_symphony.jpg",
    artist: "Aurora Nights",
    writer: "Evan Dawn",
    releaseDate: "2023-11-10",
    songURL: "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    songID: 3,
    songName: "Ocean Dreams",
    duration: "5:02",
    songImage: "https://example.com/images/ocean_dreams.jpg",
    artist: "Blue Horizon",
    writer: "Sophia Waves",
    releaseDate: "2022-05-20",
    songURL: "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    songID: 4,
    songName: "Mountain Echoes",
    duration: "3:15",
    songImage: "https://example.com/images/mountain_echoes.jpg",
    artist: "Echo Peaks",
    writer: "Liam Ridge",
    releaseDate: "2024-02-14",
    songURL: "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    songID: 5,
    songName: "Golden Horizon",
    duration: "4:30",
    songImage: "https://example.com/images/golden_horizon.jpg",
    artist: "Dawn Breakers",
    writer: "Ella Sky",
    releaseDate: "2023-09-15",
    songURL: "https://images.unsplash.com/photo-1542396601-dca920ea2807?q=80&w=1502&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Get the `q` parameter
  const [searchResult, SetSearchResult] = useState([]);

  useEffect(() => {
    console.log(query, searchParams.get("q"));
    if (query != null) {
      SetSearchResult([...resultList]);
    }
  }, [query]);

  return (
    <div className="overflow-auto md:w-full w-95 m-auto border rounded-md p-5 h-full shadow-lg min-h-full">
      <div className="hidden md:block">
        <SearchBar />
      </div>

      {query != null ? (
        <h1 className="m-2">
          Search Results for:{" "}
          <span className="font-medium uppercase">{query}</span>
        </h1>
      ) : (
        <h1 className="m-2"> Search Result will be shown here</h1>
      )}

      {/* Render your search results here */}
      <div className="flex flex-wrap gap-3">
        {searchResult.length > 0 ? (
          searchResult.map((r) => (
            <Card title={r.songName} imageUrl={r.songImage} artist={r.artist} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
