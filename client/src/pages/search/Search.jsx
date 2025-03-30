import React, { useEffect, useState } from "react";
import AdvancedSearch from "@/components/search/AdvancedSearch";
import SearchResults from "@/components/search/SearchResults";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const Search = () => {
  useDocumentTitle("TuneHub | Search");
  return (
    <div className="h-full w-full pr-2 duration-300">
      <div className="md:m-auto">
        <div className="flex justify-between items-center mb-6">
          {/* <AdvancedSearch /> */}
        </div>
        <SearchResults />
      </div>
    </div>
  );
};

export default Search;
