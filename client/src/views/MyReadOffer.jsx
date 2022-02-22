import axios from "axios";
import Timeago from "react-timeago";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitalize from "./helpers/capitalize";
import getVolume from "./helpers/getVolume";

const SingleReadOffer = (offer) => {
  const [listener, setListener] = useState({});
  const [request, setRequest] = useState({});
  const [listenerId, setListenerId] = useState("");
  const [cover, setCover] = useState("");

  const { request_id, state, created_at } = offer;

  useEffect(() => {
    axios.get(`../listens/${request_id}`).then((res) => {
      setRequest(res.data.response.request);
      setListenerId(res.data.response.request.listener_id);
    });
  }, [request_id]);

  useEffect(() => {
    if (listenerId) {
      axios
        .get(`../users/${listenerId}`)
        .then((res) => {
          setListener(res.data.user);
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err);
        });
    }
  }, [listenerId]);

  useEffect(() => {
    if (request.book_title) {
      const title = request.book_title;
      getVolume(title).then((book) => {
        setCover(book.cover);
      });
    }
  }, [request]);

  const conditionalReadingMessage = (state) => {
    if (state === "accepted") {
      return "You are reading to";
    } else if (state === "completed") {
      return "You read to";
    } else {
      return "You offered to read to";
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
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={listener.image_url} alt="listener" />
            </div>
          </div>
          <div>{conditionalReadingMessage(state)}</div>
          <p className="pb-2 text-lg mb-2 font-semibold ">{listener.name}</p>
          <div className="badge my-2">
            <b>{capitalize(state)}</b>
          </div>
        </div>
        <div className="flex items-end flex-col justify-end text-right">
          <div>
            <figure>
              {cover ? (
                <img
                  className="pl-3 py-3"
                  src={cover}
                  alt={`Cover of ${request.book_title}`}
                />
              ) : (
                <div>No cover</div>
              )}
            </figure>
          </div>
          <div>{conditionalCancelButton(state)}</div>
        </div>
      </div>
    </Link>
  );
};

export default SingleReadOffer;
