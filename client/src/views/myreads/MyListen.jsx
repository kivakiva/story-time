import capitalize from "../helpers/capitalize";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";

const Listen = (request) => {
  console.log(request);
  const [cover, setCover] = useState("");

  const { id, title, reader_id, status } = request;

  useEffect(() => {
    if (title) {
      getVolume(title).then((book) => {
        setCover(book.cover);
      });
    }
  }, [title]);
  const conditionalReadingMessage = (state) => {
    if (state === "accepted") {
      return "is reading to you";
    } else if (state === "completed") {
      return "read to you";
    } else {
      return "You offered to read to";
    }
  };
  const conditionalCancelButton = (state) => {
    if (state === "pending" || state === "accepted") {
      return <button className="btn btn-active">Cancel</button>;
    }
  };

  return (
    <Link className="grow max-w-md " to={`/listen/${id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-3 shadow-xl justify-between">
        <div className="flex flex-col mr-2 items-start items-center">
          <div>
            <figure>
              <img className="pl-3 py-3" src={cover} alt="Book" />
            </figure>
          </div>
          <div className="badge my-2">
            <b>{capitalize(status)}</b>
          </div>
          <button className="btn btn-active">cancel</button>
        </div>
        <div className="flex items-end flex-col justify-between text-right">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.lorem.space/image/face?hash=3174"
                alt="listener"
              />
            </div>
          </div>
          <p className="btn btn-active">Reader Name</p>
        </div>
      </div>
    </Link>
  );
};
export default Listen;
