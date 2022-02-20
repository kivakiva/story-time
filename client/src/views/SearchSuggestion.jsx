const SearchSuggestion = (props) => {
  const { author, title, selected, index } = props;
  console.log("index: ", index);
  console.log("selected: ", selected);
  return (
    <div className="flex justify-between">
      <span>{title}</span>
      <span>{author}</span>
    </div>
  );
};

export default SearchSuggestion;
