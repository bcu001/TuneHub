import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { Search } from "lucide-react";

/* make search bar hidden and make icon in sidebar for toggle it from hidden and visible and make it hidden by default whenever you navigate to any diffrent */

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      // console.log(`Searching query = ${searchValue}`);
    }
  };

  return (
    <div id="searchBar" className="bg-[#0000003a]  rounded">
      <form onSubmit={handleSubmit} className="flex gap-1 relative triClr">
        <input
          className="w-full p-2 pl-10 rounded outline-none   backdrop-blur-2xl"
          type="search"
          placeholder="Search for your favorite songs, albums, or artists..."
          name="q"
          id="q"
          value={searchValue}
          onChange={handleChange}
        />
        <Search className="absolute left-2 top-2 " size={25} />
      </form>
    </div>
  );
};

export default SearchBar;
