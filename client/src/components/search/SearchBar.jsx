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
    <div id="searchBar" className="shadow-ui  rounded">
      <form onSubmit={handleSubmit} className="flex gap-1 relative">
        <input
          className="w-full p-2 pr-10 rounded outline-none text-black bg-white"
          type="search"
          placeholder="Search here..."
          name="q"
          id="q"
          value={searchValue}
          onChange={handleChange}
        />
        <Search className="absolute right-2 top-2" size={25} />
      </form>
    </div>
  );
};

export default SearchBar;
