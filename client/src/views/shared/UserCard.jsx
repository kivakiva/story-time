import React from "react";
import renderRating from "../helpers/renderRating";

const UserCard = ({ listen, user }) => {
  return (
    <div className="flex bg-base-300 mb-4 pb-2 items-center justify-evenly">
      <div className="flex flex-col p-1 m-1 mx-2 items-start">
        <p className="pb-2 text-lg font-semibold ">{user.name}</p>
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.image_url} alt="user" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start  p-1 mt-3 m-1">
        <div className="flex mt-1">
          {user.listener_rating && renderRating(user.listener_rating)}
        </div>
        <p className="mb-1">Listens: {user.accepted_listens}</p>
        <div className="flex mt-1">
          {user.reader_rating && renderRating(user.reader_rating)}
        </div>
        <p className="mb-1">Reads: {user.accepted_reads}</p>
        <p className="flex my-1 flex-col items-start">
          <span>read type: </span>
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

export default UserCard;
