import React, { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";
import Error from "../shared/Error";

const Book = ({ title }) => {
  const [volume, setVolume] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("GOOGLE BOOKS CALL");
    if (title) {
      getVolume(title)
        .then((volume) => {
          setVolume(volume);
          setError("");
        })
        .catch((err) => {
          console.log(err);
          setError("Error loading book");
        });
    }
  }, [title]);

  return (
    <>
      {!error ? (
        <div className="flex justify-between mx-2 my-4 items-center">
          <div>
            <p
              style={{ color: "#005B45" }}
              className="font-semibold text-3xl py-1 mt-3"
            >
              {volume.title}
            </p>
            <p className="my-1 font-semibold">by {volume.author}</p>
          </div>
          <figure
            className="flex flex-row justify-end p-1"
            style={{ width: "10rem" }}
          >
            <img
              className="border-main-100 border border-2"
              src={volume.cover}
              alt={`Cover of ${volume.title}`}
            />
          </figure>
        </div>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default Book;
