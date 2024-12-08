import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Get the `q` parameter

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Render your search results here */}
    </div>
  );
};

export default SearchPage;
