import SingleReadOffer from "./SingleReadOffer";
import { useState, useEffect } from "react";
import axios from "axios";

const Reads = (props) => {
  const { myReads } = props;
  const parsedOffers = myReads.map((offer) => {
    return <SingleReadOffer key={offer.id} {...offer} />;
  });
  return (
    <div className="m-2 flex items-center justify-evenly bg-base-200 mt-0 flex-wrap">
      {/* {userID ? parsedReads : "you must be logged in to continue"} */}
      {parsedOffers}
    </div>
  );
};
export default Reads;
