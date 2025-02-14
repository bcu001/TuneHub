import React, { useEffect, useState } from "react";
import AdvancedSearch from "@/components/search/AdvancedSearch";
import SearchResults from "@/components/search/SearchResults";

const Search = () => {
  return (
    <div className="h-full w-full pr-2 mt-16 md:mt-0 duration-300">
      <div className="md:m-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold  w-full text-center">
            Browse Music
          </h1>
          {/* <AdvancedSearch /> */}
        </div>
        <SearchResults />
      </div>
    </div>
  );
};

export default Search;
