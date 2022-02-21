import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [parsedResults, setParsedResults] = useState([]);
  useEffect(() => {
    if (searchResults.length > 0) {
      setParsedResults(
        searchResults.map((result, index) => (
          <SearchResult key={index} {...result} />
        ))
      );
    }
  }, [searchResults]);
  return (
    <div>
      <SearchBar
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      <div className="flex flex-row flex-wrap">{parsedResults}</div>
    </div>
  );
};
export default Search;
