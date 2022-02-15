const capitalize = (words) => {
  let name = words.split(" ").map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  });
  return name.join(" ");
};

export default capitalize;
