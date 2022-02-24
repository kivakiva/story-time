import { useEffect, useState } from "react";

const SearchSuggestion = (props) => {
  const { author, title, index } = props;
  const [isSelected, setIsSelected] = useState(false);
  const totalChar = 35;
  const remainingChar = totalChar - author.length;
  let titleAbbr = title ? title.slice() : "";
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
  const bkgColor = isSelected ? "bg-accent-focus" : "bg-accent";
  return (
    <div className={`flex justify-between px-2 ${bkgColor}`}>
      <span>{titleAbbr}</span>
      <span>{author}</span>
    </div>
  );
};

export default SearchSuggestion;
