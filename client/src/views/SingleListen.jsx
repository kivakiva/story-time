import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getVolume from "./helpers/getVolume";
import renderRating from "./helpers/renderRating";
import Error from "./shared/Error";

const SingleListen = ({ id, request_text, book_title, listener_id }) => {
  const [listener, setListener] = useState("");
  const [volume, setVolume] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`../users/${listener_id}`)
      .then((res) => {
        setError("");
        setListener(res.data.user);
      })
      .catch((err) => {
        setError("Error loading listener");
        console.log(err.response.data);
        console.log(err);
      });
  }, [listener_id]);

  useEffect(() => {
    console.log("GOOGLE BOOKS CALL");
    if (book_title) {
      getVolume(book_title)
        .then((volume) => {
          setVolume(volume);
          setError("");
        })
        .catch((err) => {
          console.log(err);
          setError("Error loading book");
        });
    }
  }, [book_title]);

  return (
    <>
      {!error ? (
        <Link className="min-w-full" to={`/listen/${id}`}>
          <div className="click-shadow card border-solid border-main-100 border flex flex-col bg-base-300 shadow-xl p-4 my-3 mx-2">
            <div className="flex justify-between mb-4">
              <img
                className="border-main-100 border-2 w-5/12"
                src={volume.cover}
                alt={`Cover of ${book_title}`}
              />
              <div className="text-right ml-4">
                <h3 style={{ color: "#005B45" }} className="card-title mb-0">
                  {volume.title}
                </h3>
                <p className="font-semibold">by {volume.author}</p>
                <p className="text-right">
                  <span className="badge badge-accent font-semibold mt-3">
                    {listener.name}
                  </span>
                  <span className="flex justify-end">
                    {renderRating(listener.listener_rating)}
                  </span>
                </p>
              </div>
            </div>
            {request_text && <p className="text-right">"{request_text}"</p>}
          </div>
        </Link>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default SingleListen;
