import React, { useContext, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import debounce from "lodash/debounce";
import { MusicPlayerContext } from "@/context/MusicPlayerContext";
import axios from "axios";
import RecCard from "../cards/RecCard";
import { ListFilter } from "lucide-react";
import MainPlayer from "../musicPlayer/MainPlayer";
import useLoadSongs from "@/hooks/useLoadSongs";

import { BASE_URL } from "@/global/baseurl.js";

const categories = [
  "All",
  "Pop",
  "Rock",
  "Hip Hop",
  "Jazz",
  "Electronic",
  "Classical",
  "R&B",
  "Country",
  "Reggae",
  "Folk",
];

const SearchResults = () => {
  const { currSongList, setCurrSongList } = useContext(MusicPlayerContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterVal, setFilterVal] = useState("All");
  const [isQueryChanged, setIsQueryChanged] = useState(false);

  // use
  useLoadSongs(searchResult);

  const filterToggle = () => {
    setIsFilter(!isFilter);
  };

  const filterValChange = (e) => {
    setFilterVal(e.target.value);
    setIsQueryChanged(false); // Allow manual filter change
  };

  // Debounced Search Function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery, category) => {
      if (!searchQuery) return;

      setIsLoading(true);
      try {
        const res = await axios.post(
          `${BASE_URL}/api/v1/search/searchsongs`,
          {
            query: searchQuery,
            category: category,
          }
        );

        const tempSearchResults = res.data.data;
        setSearchResult(tempSearchResults);
        localStorage.setItem("lastSongList", JSON.stringify(tempSearchResults));
      } catch (err) {
        console.error("Error message:", err.response);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Run search when query changes (reset filter only if query is different)
  useEffect(() => {
    if (query) {
      if (!isQueryChanged) {
        setFilterVal("All"); // Reset filter only once when query changes
        setIsQueryChanged(true);
      }
      debouncedSearch(query, "All");
    } else {
      setSearchResult(null);
    }
  }, [query]);

  // Run search when filter changes
  useEffect(() => {
    if (query && !isQueryChanged) {
      debouncedSearch(query, filterVal);
    }
  }, [filterVal]);

  return (
    <div className="h-full w-full text-white">
      {/* Search Bar */}
      <div className="w-full sticky top-3 z-10">
        <SearchBar />
        <MainPlayer />
      </div>

      {/* Message and Status of Search */}
      {searchResult && (
        <div className="duration-300 ease-in-out backdrop-blur-2xl p-2 rounded-lg shadow-lg my-2">
          {/* Header with Filter Button */}
          <div className="font-bold text-center flex justify-between">
            <h2 className="text-xl flex items-center">Filter</h2>
            <button
              className="p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer text-white rounded-md transition-all"
              onClick={filterToggle}
            >
              <ListFilter className="w-6 h-6" />
            </button>
          </div>

          {/* Smooth Expanding Filter Dropdown */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out  ${
              isFilter ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <label
              htmlFor="categories"
              className="block text-lg font-medium text-gray-200"
            >
              Categories
            </label>

            <select
              name="categories"
              id="categories"
              value={filterVal}
              onChange={filterValChange}
              className="w-full mt-2 p-2 rounded-md outline-none bg-gray-900 text-white backdrop-blur-xl hover:bg-gray-800"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-gray-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Render Searched Results */}
      <div>
        {isLoading ? (
          <div className="font-bold">Loading...</div>
        ) : searchResult === null ? null : searchResult.length > 0 ? (
          <div className="flex flex-col gap-y-3 overflow-hidden mt-3">
            {searchResult.map((s) => (
              <RecCard key={s.songID} song={s} />
            ))}
          </div>
        ) : (
          <div className="font-bold text-2xl text-center">No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
