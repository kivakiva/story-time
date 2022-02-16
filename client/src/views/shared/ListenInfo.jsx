import React from "react";
import capitalize from "../helpers/capitalize";

const ListenInfo = ({
  listen,
  tagLine,
  totalOffers,
  status,
  whoCancelled,
  offer,
}) => {
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
      <p className=" text-sm font-semibold uppercase">{tagLine}</p>
      <p
        style={{ color: "#005B45" }}
        className="font-semibold text-3xl py-1 mt-3"
      >
        {listen.book_title && capitalize(listen.book_title)}
      </p>
      <p className="mb-3">by Famous Author</p>
      {offer ? (
        <div className="my-3 text-left">
          <p style={{ color: "#2F4858" }} className="font-semibold ">
            YOUR REQUEST:
          </p>
          <p className="pb-2">{listen.request_text}</p>
          <p style={{ color: "#2F4858" }} className="font-semibold">
            OFFER TO READ:
          </p>
          <p>{offer.offer_text}</p>
        </div>
      ) : (
        <p className="text-left py-2 my-1 text-lg leading-5">
          {listen.request_text}
        </p>
      )}
      {totalOffers && (
        <p className="font-semibold text-sm">Total offers: {totalOffers}</p>
      )}
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
