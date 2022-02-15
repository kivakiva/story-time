import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitalize from "./helpers/capitalize";
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

  return (
    <Link className="grow" to={`/listen/${id}`}>
      {!accepted_at && !cancelled_at && (
        <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-1 shadow-xl">
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
              <span className="flex justify-end py-2">
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
