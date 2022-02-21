import React from "react";

const UserRating = ({ whoToRate, listenID }) => {
  return (
    <div>
      <input type="checkbox" id="user-rating-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Leave a rating for your {whoToRate}!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label for="my-modal" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRating;
