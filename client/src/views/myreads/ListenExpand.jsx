import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Offers from "../Offers";
import Error from "../shared/Error";
import ListenerCard from "../shared/ListenerCard";
import ListenInfo from "../shared/ListenInfo";
import OfferSubmitForm from "../shared/OfferSubmitForm";

const ListenExpand = () => {
  const userID = localStorage.getItem("userID");

  const { listenId } = useParams();
  const [listen, setListen] = useState({});
  const [offers, setOffers] = useState("");
  const [listener, setListener] = useState({});
  const [reader, setReader] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestRes = await axios.get(`../listens/${listenId}`);
        const { request, offers } = requestRes.data.response;
        setListen(request);
        if (offers && offers.length) {
          setOffers(JSON.stringify(offers));
        }
        const listenerInfo = await axios.get(`../users/${request.listener_id}`);
        setListener(listenerInfo.data.user);
        const readerInfo = await axios.get(`../users/${userID}`);
        setReader(JSON.stringify(readerInfo.data.user));
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
  }, [listenId, userID]);

  // check if reader has submitted an offer for this request
  const hasAlreadyOffered = (readerOffers, requestID, readerID) => {
    if (!readerOffers) return false;

    for (const offer of readerOffers) {
      if (
        offer.request_id === requestID &&
        offer.reader_id === Number(readerID)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto rounded-sm mt-8">
      <ListenerCard listen={listen} listener={listener} />
      <ListenInfo listen={listen} tagLine="would like to listen to" />

      {
        // Render form if reader is not the same as listener and has not yet submitted an offer for this request
        reader &&
          Number(userID) !== listen.listener_id &&
          !hasAlreadyOffered(
            JSON.parse(reader).all_request_offers,
            listen.listener_id,
            userID
          ) && <OfferSubmitForm request_id={listenId} />
      }

      {
        // Render notice if reader is not the same as listener and has already submitted an offer for this request
        reader &&
          Number(userID) !== listen.listener_id &&
          hasAlreadyOffered(
            JSON.parse(reader).all_request_offers,
            listen.listener_id,
            userID
          ) && <p>You have submitted an offer for this request!</p>
      }

      {
        // Render offers is logged in user is the listener
        userID && Number(userID) === listen.listener_id && (
          <Offers offers={offers} />
        )
      }

      {
        // Render button to /login if user is not logged in
        !userID && (
          <Link
            to="/login"
            className="btn btn-primary mb-16 self-start mx-8 my-1"
          >
            Offer to Read
          </Link>
        )
      }

      {
        // Render error if cannot fetch data
        error && <Error error={error} />
      }
    </div>
  );
};
export default ListenExpand;
