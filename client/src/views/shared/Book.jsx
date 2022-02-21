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
    <div className=" w-full">
      {!error ? (
        <div className="flex items-center w-full pb-4">
          <div className="w-2/3 pr-6">
            <p style={{ color: "#005B45" }} className="font-semibold text-3xl">
              {volume.title}
            </p>
            <p className="font-semibold mt-2">by {volume.author}</p>
          </div>

          <img
            className="border-main-100 w-1/3"
            style={{ "borderWidth": "3px" }}
            src={volume.cover}
            alt={`Cover of ${volume.title}`}
          />
        </div>
      ) : (
        <Error error={error} />
      )}
    </div>
  );
};

export default Book;
