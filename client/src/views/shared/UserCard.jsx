import React from "react";
import renderRating from "../helpers/renderRating";

const UserCard = ({ listen, user }) => {
  return (
    <div className="flex items-start py-4 px-8 pb-2 bg-base-300">
      <div className="flex flex-col justify-start items-center w-2/3">
        <p className="pb-2 text-lg font-semibold ">{user.name}</p>
        <div className="avatar">
          <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.image_url} alt="user" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-1/3">
        <div className="flex mt-1">{renderRating(user.listener_rating)}</div>
        <p className="mb-1">Listens: {user.accepted_listens}</p>
        <div className="flex mt-1">{renderRating(user.reader_rating)}</div>
        <p className="mb-1">Reads: {user.accepted_reads}</p>
        <p className="flex my-1 flex-col items-start">
          <span>read type: </span>
          {listen.online && (
            <span className="badge badge-info bg-secondary mb-1 border-solid border-slate-400">
              online
            </span>
          )}
          {listen.in_person && (
            <span className="badge badge-success bg-secondary-focus border-solid border-slate-400">
              in person
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
