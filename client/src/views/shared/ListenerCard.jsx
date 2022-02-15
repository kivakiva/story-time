import React from "react";
import renderRating from "../helpers/renderRating";

const ListenerCard = ({ listen, listener }) => {
  return (
    <div className="flex bg-base-300 mb-4 pb-2 items-center justify-evenly">
      <div className="flex flex-col p-1 m-1 mx-2 items-start">
        <p className="pb-2 text-lg font-semibold ">{listener.name}</p>
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={listener.image_url} alt="user" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start  p-1 mt-3 m-1">
        <div className="flex mt-1">
          {listener.listener_rating && renderRating(listener.listener_rating)}
        </div>
        <p className="mb-3">Listens: {listener.accepted_listens}</p>
        <p className="flex flex-col items-start">
          <span>type: </span>
          {listen.online && (
            <span className="badge badge-info bg-secondary mb-1">online </span>
          )}
          {listen.in_person && (
            <span className="badge badge-success bg-secondary-focus">
              in person
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ListenerCard;
