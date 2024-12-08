import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

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
      console.log(`Searching query = ${searchValue}`);
    }
  };

  return (
    <div id="searchBar" className="m-2">
      <form onSubmit={handleSubmit} className="flex  gap-1 ">
        <input
          className="bg-gray-200 rounded-md p-1 outline-none w-full"
          placeholder="Search here..."
          type="search"
          name="q"
          id="q"
          value={searchValue}
          onChange={handleChange}
        />
        <button
          className="bg-purple-400 p-1 rounded-md cursor-pointer text-white hover:bg-purple-500 font-bold"
          type="submit"
        >
          <img src={assets.searchIcon} alt="searchIcon" width={25} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
