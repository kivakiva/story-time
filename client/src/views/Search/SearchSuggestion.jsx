import { useEffect, useState } from "react";

const SearchSuggestion = (props) => {
  const { author, title, index } = props;
  const [isSelected, setIsSelected] = useState(false);
  const totalChar = 35;
  const remainingChar = totalChar - author.length;
  let titleAbbr = title.slice();
  if (title.length > remainingChar) {
    titleAbbr = title.slice(0, remainingChar).concat(`...  `);
  }
  useEffect(() => {
    if (props.selected === index) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.selected, index]);
  return (
    <div className="flex justify-between">
      {isSelected && "x "}
      <span>{titleAbbr}</span>
      <span>{author}</span>
    </div>
  );
};

export default SearchSuggestion;
