import capitalize from "../helpers/capitalize";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";
import axios from "axios";

const Listen = (request) => {
  const [cover, setCover] = useState("");
  const [reader, setReader] = useState({});
  const [reqStatus, setReqStatus] = useState({});
  const { id, book_title, reader_id, status } = request;
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (book_title) {
      getVolume(book_title).then((book) => {
        setCover(book.cover);
      });
      axios
        .get(`users/${reader_id}`)
        .then((res) => {
          const user = res.data.user;
          console.log(user);
          setReader(user);
        })
        .catch((err) => console.log(err));
      setReqStatus({
        accepted: request.accepted_at !== null,
        active:
          request.accepted_at && !request.completed_at && !request.cancelled_at,
        cancelled: request.cancelled_at !== null,
        completed: request.completed_at !== null,
        pending:
          !request.accepted_at &&
          !request.completed_at &&
          !request.cancelled_at,
      });
    }
  }, [request]);

  useEffect(() => {}, [reader_id]);
  // different statuses of reading request
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
  const cancelRequest = (requestId) => {
    console.log("cancel");
    const cancel = {
      action: "CANCEL",
      who_cancelled_id: userID,
    };
    axios.put(`listens/${requestId}`, cancel);
  };
  return (
    <Link className="grow max-w-md " to={`/listen/${id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-3 shadow-xl justify-between">
        <div className="flex flex-col mr-2 items-start items-center">
          <div>
            <figure>
              <div className="badge rounded-b-none">"status"</div>
              <img className="pb-3" src={cover} alt="Book" />
            </figure>
          </div>
          <button className="btn btn-active" onClick={() => cancelRequest(id)}>
            cancel
          </button>
        </div>
        <div className="flex items-end flex-col justify-start text-center m-2 my-3 p-3">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  reader.image_url
                    ? reader.image_url
                    : "https://api.lorem.space/image/face?hash=3174"
                }
                alt="listener"
              />
            </div>
          </div>
          <div className="mt-2">
            <b>{reader.name && capitalize(reader.name)}</b>
          </div>
          <div className="text-center">is reading to you.</div>
        </div>
      </div>
    </Link>
  );
};
export default Listen;
