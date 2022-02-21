import React from "react";
import displayNotification from "../helpers/displayNotification";

const UserRating = ({ whoToRate, listenID }) => {
  const handleSubmit = () => {
    console.log("listenID :>> ", listenID);
    displayNotification("Rating accepted");
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
            <input type="radio" name="rating-2" className="mask mask-star-2" />
            <input type="radio" name="rating-2" className="mask mask-star-2" />
            <input type="radio" name="rating-2" className="mask mask-star-2" />
            <input type="radio" name="rating-2" className="mask mask-star-2" />
            <input type="radio" name="rating-2" className="mask mask-star-2" />
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

export default UserRating;
