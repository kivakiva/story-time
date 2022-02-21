import axios from "axios";
import React, { useState, useEffect } from "react";
import renderRating from "../helpers/renderRating";
import Error from "./Error";
import UserRatingModal from "./UserRatingModal";

const SingleListenRating = ({ whoToRate, listenID }) => {
  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  // const [listenerRating, setListenerRating] = useState(0);

  // const rating = whoToRate === "reader" ? readerRating : listenerRating;

  // Fetch reader rating if it exists
  useEffect(() => {
    if (whoToRate === "reader") {
      axios
        .get(`/ratings/readers/listens/${listenID}`)
        .then((res) => {
          if (res.data.reader_rating) {
            setRating(res.data.reader_rating.rating);
          }
          setError("");
        })
        .catch((err) => {
          setError("Error loading rating details");
          console.log(err);
        });
    }
  }, [listenID, whoToRate]);

  // Fetch listener rating if it exists
  useEffect(() => {
    if (whoToRate === "listener") {
      axios
        .get(`/ratings/listeners/listens/${listenID}`)
        .then((res) => {
          if (res.data.listener_rating) {
            setRating(res.data.listener_rating.rating);
          }
          setError("");
        })
        .catch((err) => {
          setError("Error loading rating details");
          console.log(err);
        });
    }
  }, [listenID, whoToRate]);

  return (
    <>
      {!error ? (
        <>
          {!rating ? (
            <UserRatingModal
              whoToRate={whoToRate}
              listenID={listenID}
              updateRating={setRating}
            />
          ) : (
            <p className="text-left text-sm mx-8 mb-6">
              Your rating for the {whoToRate}:
              <span className="flex py-1">{renderRating(rating)}</span>
            </p>
          )}
        </>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default SingleListenRating;
