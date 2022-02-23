import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import roundRating from "./roundRating";

const renderRating = (userRating) => {
  const stars = [];
  const rating = roundRating(userRating);
  const emptyStars = 5 - rating;
  for (let i = 0; i < rating; i++) {
    stars.push(<TiStarFullOutline key={i} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<TiStarOutline key={5 - i} />);
  }
  return stars;
};

export default renderRating;
