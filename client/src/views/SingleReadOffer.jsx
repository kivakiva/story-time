import axios from "axios";
import Timeago from "react-timeago";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitalize from "./helpers/capitalize";
import renderRating from "./helpers/renderRating";

const SingleReadOffer = (offer) => {
  const [listener, setListener] = useState({});
  const [request, setRequest] = useState({});
  const [listenerId, setListenerId] = useState("");

  const { id, request_id, state, created_at } = offer;

  useEffect(() => {
    axios.get(`../listens/${request_id}`).then((res) => {
      setRequest(res.data.response.request);
      setListenerId(res.data.response.request.listener_id);
    });
  }, [request_id]);
  useEffect(() => {
    if (request.listener_id) {
      axios
        .get(`../users/${request.listener_id}`)
        .then((res) => {
          setListener(res.data.user);
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err);
        });
    }
  }, [request.listener_id]);
  const conditionalReadingMessage = (state) => {
    if (state === "accepted") {
      return "You are reading";
    } else if (state === "completed") {
      return "You read";
    } else {
      return "You offered to read";
    }
  };
  const conditionalCancelButton = (state) => {
    if (state === "pending" || state === "accepted") {
      return <button className="btn btn-active">Cancel</button>;
    } else {
      return <Timeago date={created_at} />;
    }
  };
  return (
    <Link className="grow max-w-md " to={`/listen/${request_id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-3 shadow-xl justify-between">
        <div className="flex flex-col mr-2 items-start items-center">
          <p className="pb-2 text-lg font-semibold ">{listener.name}</p>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={listener.image_url} alt="listener" />
            </div>
          </div>
          <div className="flex flex-row">
            {listener.listener_rating && renderRating(listener.listener_rating)}
          </div>
          <div>Listens: {listener.accepted_listens}</div>
        </div>
        <div className="flex items-end flex-col justify-between text-right">
          <div>
            <div>
              <b>{capitalize(state)}</b>
            </div>
            <div>{conditionalReadingMessage(state)}</div>
            <figure>
              <img
                className="pl-3 py-3"
                src="https://api.lorem.space/image/book?w=80&h=120"
                alt="Book"
              />
            </figure>
            <div>{request.book_title} </div>
          </div>
          <div>{conditionalCancelButton(state)}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleReadOffer;
