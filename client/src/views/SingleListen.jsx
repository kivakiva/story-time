import axios from "axios";
import React, { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import capitalize from "./helpers/capitalize";
import roundRating from "./helpers/roundRating";

const SingleListen = ({
  request_text,
  book_title,
  accepted_at,
  cancelled_at,
  listener_id,
}) => {
  const [listener, setListener] = useState("");
  const [listenerRating, setListenerRating] = useState(null);

  useEffect(() => {
    axios
      .get(`../users/${listener_id}`)
      .then((res) => {
        setListener(res.data.user.name);
        setListenerRating(res.data.user.listener_rating);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  }, [listener_id]);

  const renderRating = (listenerRating) => {
    const stars = [];
    const rating = roundRating(listenerRating);
    const emptyStars = 5 - rating;
    for (let i = 0; i < rating; i++) {
      stars.push(<TiStarFullOutline />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<TiStarOutline />);
    }
    return stars;
  };

  return (
    <Link to="/">
      {!accepted_at && !cancelled_at && (
        <div className="card border-solid border-stone-400 border grow card-side bg-base-300 m-2 my-3 p-1 shadow-xl">
          <figure>
            <img
              className="pl-3 py-3"
              src="https://api.lorem.space/image/book?w=80&h=120"
              alt="Book"
            />
          </figure>
          <div className="card-body p-3">
            <h3 style={{ color: "#1B3D2F" }} className="card-title mb-0">
              {capitalize(book_title)}
            </h3>
            <p className="pb-3 font-semibold">by Famous Author</p>
            <p className="text-right">
              <span className="badge badge-accent font-semibold">
                {listener}
              </span>
              <span style={{ color: "#f4d325" }} className="flex justify-end">
                {listenerRating && renderRating(listenerRating)}
              </span>
            </p>
            <p className="text-right"> {request_text}</p>
          </div>
        </div>
      )}
    </Link>
  );
};

export default SingleListen;
