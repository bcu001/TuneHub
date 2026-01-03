import React from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    value.trim() ? setSearchParams({ q: value }) : setSearchParams({});
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
  }
  return (
    <div
      id="searchBar"
      className="bg-surface-dark text-text-main-light rounded"
    >
      <form onSubmit={handleSubmit} className="flex gap-1 relative triClr">
        <input
          className="w-full p-2 pl-10 rounded outline-none   backdrop-blur-2xl"
          type="search"
          placeholder="Search for your favorite songs, albums, or artists..."
          name="q"
          id="q"
          value={q}
          onChange={handleChange}
        />
        <Search className="absolute left-2 top-2 " size={25} />
      </form>
    </div>
  );
};

export default SearchInput;
