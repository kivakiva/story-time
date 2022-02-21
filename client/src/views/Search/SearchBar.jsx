import { useEffect, useState } from "react";
import getVolumes from "../helpers/getVolumes";
import SearchSuggestion from "./SearchSuggestion";
const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(0);
  const [volumes, setVolumes] = useState([]);
  const { setSearchResults } = props;

  //on submit, pass search of currently selected title to parent
  const handleSubmit = (e) => {
    e.preventDefault();
    if (volumes.length > 0) {
      getVolumes(volumes[selected].title)
        .then((volumes) => {
          console.log("volumes");
          console.log(volumes);
          setSearchResults(volumes);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length > 3) {
      getVolumes(search)
        .then((volumes) => {
          setVolumes(volumes);
        })
        .catch((err) => console.log(err));
    } else {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    if (volumes.length > 0) {
      const parsedVolumes = volumes.map((volume, index) => {
        return (
          <SearchSuggestion
            key={index}
            {...volume}
            index={index}
            selected={selected}
          />
        );
      });
      setSuggestions(parsedVolumes);
    }
  }, [volumes, selected]);
  const navigateSelected = (e) => {
    const key = e.code;
    if (key === "ArrowDown") {
      if (selected < suggestions.length - 1) {
        setSelected(selected + 1);
      }
    } else if (key === "ArrowUp") {
      if (selected > -1) {
        setSelected(selected - 1);
      }
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col mx-10">
          <input
            className="text-center"
            type="text"
            placeholder="Enter a title or an author"
            value={search}
            onChange={(e) => handleSearch(e)}
            onKeyDown={(e) => navigateSelected(e)}
          />
          <div>{suggestions}</div>
        </div>
        <button className="btn btn-primary mt-3">
          <input type="submit" value="Submit" />
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
