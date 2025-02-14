import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "@/components/cards/Card";
import SearchBar from "@/components/search/SearchBar";

// data
import song from "@/database/song.json";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import axios from "axios";
import Loading from "../common/Loading/Loading";

const SearchResults = () => {
  const { currSongList, setCurrSongList } = useContext(MusicPlayerContext);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchResult, SetSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    searchingSong();
  }, [query]);

  const searchingSong = async () => {
    // Empty the result list before every search
    SetSearchResult([]);

    try {
      setIsLoading(true);
      const res = await axios.get("http://localhost:3000/api/songs/getSongs");
      // console.log(res.data);

      const sg = res.data.filter((s) =>
        s.songName.toLowerCase().includes(query)
      );
      const ar = res.data.filter((s) => s.artist.toLowerCase().includes(query));
      const wr = res.data.filter((s) => s.writer.toLowerCase().includes(query));

      // Combine the results, removing duplicates
      const combinedResults = [...new Set([...sg, ...ar, ...wr])];
      SetSearchResult(combinedResults);

      // Storing Current searched song into context
      localStorage.setItem("lastSongList", JSON.stringify(combinedResults));
      setCurrSongList(combinedResults);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }

    // const sg = song.songs.filter((s) =>
    //   s.songName.toLowerCase().includes(query)
    // );
    // const ar = song.songs.filter((s) => s.artist.toLowerCase().includes(query));

    // const wr = song.songs.filter((s) => s.writer.toLowerCase().includes(query));

    // // Combine the results, removing duplicates
    // const combinedResults = [...new Set([...sg, ...ar, ...wr])];

    // // Update the search result
    // SetSearchResult(combinedResults);

    // // Storing Current searched song into context
    // localStorage.setItem("lastSongList", JSON.stringify(combinedResults));
    // setCurrSongList(combinedResults);
  };

  const checkList = () => {
    console.log(currSongList);
  };

  return (
    <div className="h-full w-full">
      <div className="items-center justify-center hidden md:flex">
        <SearchBar />
      </div>
      <div className="font-bold text-3xl text-center mt-3">
        <span>Total Number of Results: </span>
        {currSongList && currSongList.length}
      </div>
      <div>
        {query === null ? (
          <div className="font-bold text-4xl text-center mt-4">
            Search any song using song name , artist or writer
          </div>
        ) : (
          <div>
            {searchResult.length > 0 ? (
              // Rendering search results here
              <div
                id=""
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-4"
              >
                {searchResult.map((s) => (
                  <Card key={s.songID} song={s} />
                ))}
              </div>
            ) : isLoading ? (
              <div className="mt-5">
                <Loading />
              </div>
            ) : (
              <div className="text-center text-5xl mt-5">No Result Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
