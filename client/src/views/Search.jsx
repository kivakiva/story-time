import { useState } from "react";
import getVolumes from "./helpers/getVolumes";
import SearchSuggestion from "./SearchSuggestion";
const Search = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(-1);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    getVolumes(search);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length > 4) {
      getVolumes(search)
        .then((volumes) => {
          const parsedVolumes = volumes.map((volume, index) => (
            <SearchSuggestion
              key={index}
              {...volume}
              index={index}
              selected={selected}
            />
          ));
          setSuggestions(parsedVolumes);
        })
        .catch((err) => console.log(err));
    } else {
      setSuggestions([]);
    }
  };
  return (
    <div>
      <div>Enter your search:</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Search:
          <input
            type="text"
            placeholder="search here"
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{suggestions}</div>
    </div>
  );
};
export default Search;
