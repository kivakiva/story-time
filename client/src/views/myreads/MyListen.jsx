import capitalize from "../helpers/capitalize";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";
import axios from "axios";

const Listen = (request) => {
  const [cover, setCover] = useState("");
  const [reader, setReader] = useState({});
  const [reqStatus, setReqStatus] = useState("");
  const [offersCount, setOffersCount] = useState(0);
  const [badgeColour, setBadgeColour] = useState("");
  const [isCancelled, setIsCancelled] = useState(request.cancelled_at);
  const { id, book_title, reader_id, listener_id } = request;
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (book_title) {
      getVolume(book_title)
        .then((book) => {
          setCover(book.cover);
        })
        .catch((err) => console.log(err));
      if (reader_id) {
        axios
          .get(`users/${reader_id}`)
          .then((res) => {
            const user = res.data.user;
            setReader(user);
          })
          .catch((err) => console.log(err)); // set offer state
      }
      let state = "";
      let stateColour = "";
      if (isCancelled) {
        state = "cancelled";
      } else if (request.completed_at) {
        state = "completed";
      } else if (request.request_offer_id) {
        state = "active";
        stateColour = "badge-secondary";
      } else if (!request.request_offer_id) {
        state = "pending";
      }
      setReqStatus(state);
      setBadgeColour(stateColour);
    }
  }, [request, book_title, reader_id, isCancelled]);

  useEffect(() => {
    if (reqStatus === "pending") {
      axios
        .get(`listens/${id}`)
        .then((res) => {
          if (res.offers) {
            setOffersCount(res.offers.length);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [reqStatus, id]);
  // different statuses of reading request
  const cancelRequest = (requestId) => {
    const cancel = {
      action: "CANCEL",
      who_cancelled_id: userID,
    };
    axios.put(`listens/${requestId}`, cancel);
    //ensure component re-renders:
    setIsCancelled(true);
  };

  return (
    <Link className="grow max-w-md " to={`/listen/${id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-3 shadow-xl justify-between">
        <div className="flex flex-col mr-2 items-start items-center">
          <div>
            <figure>
              <div className={`badge ${badgeColour} rounded-b-none`}>
                {reqStatus}
              </div>
              <img className="pb-3" src={cover} alt={`${book_title}`} />
            </figure>
          </div>
          {reqStatus !== "cancelled" && (
            <button
              className="btn btn-active"
              onClick={(e) => {
                e.preventDefault();
                cancelRequest(id);
              }}
            >
              cancel
            </button>
          )}
        </div>
        {!reader_id ? (
          reqStatus === "pending" ? (
            <div>
              <div className="mb-3">
                You have {offersCount} offer{offersCount !== 1 && "s"}.
              </div>
              {offersCount > 0 ? (
                <button className="btn btn-primary">View your offers</button>
              ) : (
                <button className="btn btn-primary">View your request</button>
              )}
            </div>
          ) : (
            "you cancelled this request"
          )
        ) : (
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
            <div className="text-center">
              {reqStatus === "active" ? "is reading to you." : "read to you."}
            </div>
            {reqStatus === "active" && (
              <Link
                to={
                  listener_id < reader_id
                    ? `/conversations/${listener_id}_${reader_id}`
                    : `/conversations/${reader_id}_${listener_id}`
                }
              >
                <i className="fa fa-commenting text-3xl" aria-hidden="true"></i>
              </Link>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
export default Listen;
