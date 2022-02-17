import SingleReadOffer from "./SingleReadOffer";
import { useState, useEffect } from "react";
import axios from "axios";

const Reads = (props) => {
  const { myReads } = props;
  const parsedReads = myReads.map((listen) => {
    return <SingleReadOffer key={listen.id} {...listen} />;
  });
  return (
    <div className="m-2 flex items-center justify-evenly bg-base-200 mt-0 flex-wrap">
      {/* {userID ? parsedReads : "you must be logged in to continue"} */}
      {parsedReads}
    </div>
  );
};
export default Reads;
