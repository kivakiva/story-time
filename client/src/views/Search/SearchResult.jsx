const SearchResults = (props) => {
  const { title, author, cover, setBook_title } = props;
  return (
    <div className="flex items-center w-full p-4">
      <div className="w-2/3 pr-6">
        <p style={{ color: "#005B45" }} className="font-semibold text-3xl">
          {title}
        </p>
        <p className="font-semibold mt-2">by {author}</p>
      </div>

      <img
        className="border-main-100 w-1/3"
        style={{ "border-width": "3px" }}
        src={cover}
        alt={`Cover of ${title}`}
        onClick={() => {
          setBook_title(props);
        }}
      />
    </div>
  );
};

export default SearchResults;
