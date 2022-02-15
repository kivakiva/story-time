import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import roundRating from "./roundRating";

const renderRating = (listenerRating) => {
  const stars = [];
  const rating = roundRating(listenerRating);
  const emptyStars = 5 - rating;
  for (let i = 0; i < rating; i++) {
    stars.push(<TiStarFullOutline style={{ color: "#f4d325" }} key={i} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<TiStarOutline style={{ color: "#f4d325" }} key={5 - i} />);
  }
  return stars;
};

export default renderRating;
