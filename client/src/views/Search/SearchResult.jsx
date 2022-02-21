const SearchResults = (props) => {
  const { title, author, cover } = props;
  return (
    <div>
      <div>{title}</div>
      <div>{author}</div>
      <div>{cover}</div>
    </div>
  );
};

export default SearchResults;
