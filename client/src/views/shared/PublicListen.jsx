import axios from "axios";
import React, { useEffect, useState } from "react";
import capitalize from "../helpers/capitalize";

const PublicListen = (props) => {
  const {
    id,
    request_text,
    book_title,
    online,
    in_person,
    accepted_at,
    created_at,
    cancelled_at,
    listener_id,
  } = props;
  const [listener, setListener] = useState("");

  useEffect(() => {
    axios
      .get(`../users/${listener_id}`)
      .then((res) => {
        setListener(res.data.user.name);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  }, [listener_id]);

  return (
    <>
      {!accepted_at && !cancelled_at && (
        <div className="card border-solid border-stone-400 border grow card-side bg-base-300 m-2 my-3 p-1 shadow-xl">
          <figure>
            <img
              className="py-2 pl-2"
              src="https://api.lorem.space/image/book?w=80&h=120"
              alt="Book"
            />
          </figure>
          <div className="card-body p-3">
            <h3 style={{ color: "#1B3D2F" }} className="card-title mb-0">
              {capitalize(book_title)}
            </h3>
            <p className="pb-1 font-semibold">by Famous Author</p>
            <p className="text-right">
              <span className="badge badge-accent font-semibold">
                {listener}
              </span>
              <span className="text-justify"> {request_text}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicListen;
