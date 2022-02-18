import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getVolume from "./helpers/getVolume";
import renderRating from "./helpers/renderRating";

const SingleListen = ({
  id,
  request_text,
  book_title,
  accepted_at,
  cancelled_at,
  listener_id,
}) => {
  const [listener, setListener] = useState("");
  const [listenerRating, setListenerRating] = useState(null);
  const [volume, setVolume] = useState({});

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

  useEffect(() => {
    getVolume(book_title).then((volume) => setVolume(volume));
  }, [book_title]);

  return (
    <Link className="min-w-full" to={`/listen/${id}`}>
      {!accepted_at && !cancelled_at && (
        <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-1 shadow-xl">
          <figure className="mt-3 ml-3" style={{ border: "3px solid #796d5d" }}>
            <img src={volume.cover} alt={`Cover of ${book_title}`} />
          </figure>
          <div className="card-body p-3">
            <h3 style={{ color: "#005B45" }} className="card-title mb-0">
              {book_title}
            </h3>
            <p className="pb-3 font-semibold">by {volume.author}</p>
            <p className="text-right">
              <span className="badge badge-accent font-semibold">
                {listener}
              </span>
              <span className="flex justify-end py-2">
                {renderRating(listenerRating)}
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
