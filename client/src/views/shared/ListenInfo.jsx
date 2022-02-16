import React from "react";
import capitalize from "../helpers/capitalize";

const ListenInfo = ({ listen, tagLine, totalOffers, status, whoCancelled }) => {
  let badgeClass = "";
  switch (status) {
    case "active":
      badgeClass = "secondary";
      break;
    case "pending":
      badgeClass = "accent";
      break;
    case "cancelled":
      badgeClass = "primary";
      break;
    default:
      badgeClass = "badge";
  }

  return (
    <div className="flex flex-col items-start mb-2 mx-8">
      <p className=" text-sm font-semibold">{tagLine}</p>
      <p style={{ color: "#1B3D2F" }} className="font-semibold text-lg py-1">
        {listen.book_title && capitalize(listen.book_title)}
      </p>
      <p>by Famous Author</p>
      <p className="text-left py-2 my-1 text-lg leading-5">
        {listen.request_text}
      </p>
      <p className="font-semibold text-sm">Total offers: {totalOffers}</p>
      <p>
        <span className={`badge badge-${badgeClass} py-3 my-3`}> {status}</span>
        {whoCancelled && (
          <span
            style={{ color: "#7A1C00" }}
            className="px-1 text-sm font-semibold"
          >
            by {whoCancelled}
          </span>
        )}
      </p>
    </div>
  );
};

export default ListenInfo;
