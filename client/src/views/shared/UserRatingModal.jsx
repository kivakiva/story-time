import axios from "axios";
import React, { useState } from "react";
import displayNotification from "../helpers/displayNotification";

const UserRatingModal = ({ whoToRate, listenID, updateRating }) => {
  const [rating, setRating] = useState(1);

  const handleSubmit = async () => {
    try {
      if (whoToRate === "reader") {
        await axios.post("/ratings/readers", {
          rating,
          request_id: listenID,
        });
      }

      if (whoToRate === "listener") {
        await axios.post("/ratings/listeners", {
          rating,
          request_id: listenID,
        });
      }
      displayNotification("Rating accepted");
      updateRating(rating); // update rating and rerender the SingleListenRating component to show the new rating
    } catch (err) {
      console.log(err);
      displayNotification("An error occured while submitting your raiting");
    }
  };

  return (
    <div>
      <label htmlFor="user-rating-modal" className="btn modal-button m-1 mb-6">
        Leave a rating
      </label>
      <input type="checkbox" id="user-rating-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Leave a rating for your {whoToRate}!
          </h3>
          <div className="rating m-1 p-1">
            <input
              onClick={() => setRating(1)}
              type="radio"
              name="rating-2"
              className="mask mask-star-2"
              defaultChecked
            />
            <input
              onClick={() => setRating(2)}
              type="radio"
              name="rating-2"
              className="mask mask-star-2"
            />
            <input
              onClick={() => setRating(3)}
              type="radio"
              name="rating-2"
              className="mask mask-star-2"
            />
            <input
              onClick={() => setRating(4)}
              type="radio"
              name="rating-2"
              className="mask mask-star-2"
            />
            <input
              onClick={() => setRating(5)}
              type="radio"
              name="rating-2"
              className="mask mask-star-2"
            />
          </div>
          <div className="modal-action">
            <label
              onClick={handleSubmit}
              htmlFor="user-rating-modal"
              className="btn"
            >
              Submit
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRatingModal;
