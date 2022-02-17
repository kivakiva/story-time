import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import capitalize from "./helpers/capitalize";
import renderRating from "./helpers/renderRating";

const SingleReadOffer = ({ id, request_id, state, created_at }) => {
  const [listener, setListener] = useState({});
  const [request, setRequest] = useState({});
  const [listenerId, setListenerId] = useState("");

  useEffect(() => {
    axios.get(`../listens/${request_id}`).then((res) => {
      // console.log("the request:");
      // console.log(res.data);
      setRequest(res.data.response.request);
      setListenerId(res.data.response.request.listener_id);
    });
  }, [request_id]);
  useEffect(() => {
    if (request.listener_id) {
      axios
        .get(`../users/${request.listener_id}`)
        .then((res) => {
          console.log("the listener");
          console.log(res.data);
          setListener(res.data.user);
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log(err);
        });
    }
  }, [request.listener_id]);

  return (
    <Link className="grow max-w-md " to={`/listen/${request_id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-1 shadow-xl">
        <div className="flex flex-col p-1 m-1 mx-2 items-start">
          <p className="pb-2 text-lg font-semibold ">{listener.name}</p>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={listener.image_url} alt="listener" />
            </div>
          </div>
        </div>
        <div className="items-center flex-col">col 2</div>
        <div>col 3</div>
      </div>
    </Link>
  );
};

export default SingleReadOffer;
