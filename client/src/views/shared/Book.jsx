import React from "react";

const Book = ({ title, author, cover }) => {
  return (
    <div className="flex justify-between mx-2 my-4 items-center">
      <div>
        <p
          style={{ color: "#005B45" }}
          className="font-semibold text-3xl py-1 mt-3"
        >
          {title}
        </p>
        <p className="my-1 font-semibold">by {author}</p>
      </div>
      <figure className="flex flex-row justify-end" style={{ width: "10rem" }}>
        <img
          style={{ border: "3px solid #796d5d" }}
          src={cover}
          alt={`Cover of ${title}`}
        />
      </figure>
    </div>
  );
};

export default Book;
