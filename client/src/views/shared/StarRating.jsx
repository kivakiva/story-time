import React from "react";

function StarRating(props) {
  console.log(props)
  const rating_number = Number(props.rating);
  console.log(rating_number)

  let parsedRating;
  if (rating_number <= 1) {
    parsedRating = (
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
    );
  } else if (rating_number <= 2) {
    parsedRating = (
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
    );
  } else if (rating_number <= 3) {
    parsedRating = (
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
    );
  } else if (rating_number <= 4) {
    parsedRating = (
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-regular fa-star"></i>
      </div>
    );
  } else {
    parsedRating = (
      <div className="flex flex-row">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </div>
    );
  }

  return parsedRating;
}

export default StarRating;
