import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import capitalize from "../helpers/capitalize";
import renderRating from "../helpers/renderRating";
import Offers from "../Offers";
import Error from "../shared/Error";

const ListenExpand = () => {
  const userID = localStorage.getItem("userID");

  const { listenId } = useParams();
  const [listen, setListen] = useState({});
  const [offers, setOffers] = useState("");
  const [listener, setListener] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestRes = await axios.get(`../listens/${listenId}`);
        const { request, offers } = requestRes.data.response;
        setListen(request);
        console.log("request :>> ", request);
        if (offers && offers.length) {
          setOffers(JSON.stringify(offers));
        }
        console.log("offers :>> ", offers);
        const userRes = await axios.get(`../users/${request.listener_id}`);
        const { user } = userRes.data;
        console.log("user :>> ", user);
        setListener(user);
        setError("");
      } catch (err) {
        setError("Error loading data");
        setListen({});
        setListener({});
        setOffers("");
        console.log(err);
      }
    };
    fetchData();
  }, [listenId]);

  return (
    <div className="flex flex-col max-w-lg mx-auto  rounded-sm mt-8">
      <div className="flex bg-base-300 mb-4 pb-2 items-center justify-evenly">
        <div className="flex flex-col p-1 m-1 mx-2 items-start">
          <p className="pb-2 text-lg font-semibold ">{listener.name}</p>
          <div class="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={listener.image_url} alt="user" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start  p-1 mt-3 m-1">
          <div className="flex mt-1">
            {listener.listener_rating && renderRating(listener.listener_rating)}
          </div>
          <p className="mb-3">Listens: {listener.accepted_listens}</p>
          <p className="flex flex-col items-start">
            <span>type: </span>
            {listen.online && (
              <span className="badge badge-info bg-secondary mb-1">
                online{" "}
              </span>
            )}
            {listen.in_person && (
              <span className="badge badge-success bg-secondary-focus">
                in person
              </span>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start mb-2 mx-8">
        <p className=" text-sm font-semibold">would like to listen to</p>
        <p style={{ color: "#1B3D2F" }} className="font-semibold text-lg py-1">
          {listen.book_title && capitalize(listen.book_title)}
        </p>
        <p>by Famous Author</p>
        <p className="text-left pt-2 mt-1 text-lg leading-5">
          {listen.request_text}
        </p>
      </div>
      {userID && Number(userID) !== listen.listener_id && (
        <form className="mb-16 flex flex-col mt-3 mx-8">
          <textarea
            className="textarea h-24 textarea-secondary mb-4 mt-2"
            placeholder="Optional - My message to listener"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Offer to Read
          </button>
        </form>
      )}
      {userID && Number(userID) === listen.listener_id && (
        <div className="flex justify-evenly my-3 mx-8">
          <Link
            className="btn btn-primary m-1 px-1"
            to={`./offers`}
            offers={offers}
          >
            See read offers
          </Link>
          <button className="btn m-1 px-4">Edit</button>
          <button className="btn btn-secondary m-1 px-1">Cancel request</button>
        </div>
      )}
      {!userID && (
        <Link
          to="/login"
          className="btn btn-primary mb-16 self-start mx-8 my-1"
        >
          Offer to Read
        </Link>
      )}
      {error && <Error error={error} />}
    </div>
  );
};
export default ListenExpand;
