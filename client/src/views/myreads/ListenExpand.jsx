import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Offers from "../Offers";
import Error from "../shared/Error";
import ListenerCard from "../shared/ListenerCard";
import ListenInfo from "../shared/ListenInfo";
import OfferSubmitForm from "../shared/OfferSubmitForm";
import UpdateOfferButtons from "../shared/UpdateOfferButtons";
import Notice from "../shared/Notice";

const ListenExpand = () => {
  const userID = Number(localStorage.getItem("userID"));
  const { listenId } = useParams();
  const [listen, setListen] = useState({});
  const [offers, setOffers] = useState("");
  const [listener, setListener] = useState({});
  const [reader, setReader] = useState("");
  const [totalOffers, setTotalOffers] = useState(0);
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
        setTotalOffers(request.total_offers);
        const listenerInfo = await axios.get(`../users/${request.listener_id}`);
        setListener(listenerInfo.data.user);
        if (userID) {
          const readerInfo = await axios.get(`../users/${userID}`);
          setReader(JSON.stringify(readerInfo.data.user));
        }
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

  //check if the logged in user is trying to access a read request that has been accepted
  // or cancelled and the user is not the reader and not the listener
  const wrongUser = () => {
    if (
      (listen.accepted_at || listen.cancelled_at) &&
      listen.reader_id !== userID &&
      listen.listener_id !== userID
    ) {
      return true;
    }
    return false;
  };

  // check if reader has already submitted an offer for this request
  const hasAlreadyOffered = () => {
    const readerOffers = JSON.parse(reader).all_request_offers;
    if (!readerOffers) return false;

    for (const offer of readerOffers) {
      if (offer.request_id === listen.id && offer.reader_id === userID) {
        return true;
      }
    }
    return false;
  };

  // check if the logged in user is the creator of the read request
  const correctListener = () => {
    return userID === listen.listener_id;
  };

  // check if the logged in user is the accepted reader for the request
  const correctReader = () => {
    return userID === listen.reader_id;
  };

  const reqStatus = {
    accepted: listen.accepted_at !== null,
    acctive: listen.accepted_at && !listen.completed_at && !listen.cancelled_at,
    cancelled: listen.cancelled_at !== null,
    completed: listen.completed_at !== null,
    pending: !listen.accepted_at && !listen.completed_at,
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto rounded-sm mt-8">
      <ListenerCard listen={listen} listener={listener} />
      {reqStatus.pending && (
        <ListenInfo
          listen={listen}
          totalOffers={totalOffers}
          tagLine="would like to listen to"
          status="pending"
        />
      )}
      {reqStatus.completed && (
        <ListenInfo
          listen={listen}
          totalOffers={totalOffers}
          tagLine="was listening to"
          status="completed"
        />
      )}
      {reqStatus.active && (
        <ListenInfo
          listen={listen}
          totalOffers={totalOffers}
          tagLine="is listening to"
          status="active"
        />
      )}
      {reqStatus.cancelled && (
        <ListenInfo
          listen={listen}
          totalOffers={totalOffers}
          tagLine="is listening to"
          status="cancelled"
        />
      )}

      {
        // Render form if reader is not the same as listener and has not yet submitted an offer for this request
        !wrongUser() &&
          reader &&
          !correctListener() &&
          !hasAlreadyOffered() && (
            <OfferSubmitForm
              request_id={listenId}
              setTotalOffers={setTotalOffers}
            />
          )
      }

      {
        // Render notice if reader is not the same as listener and the reader has already submitted an offer for this request
        reqStatus.pending &&
          reader &&
          !correctListener() &&
          hasAlreadyOffered() && (
            <>
              <Notice message="You have already submitted an offer for this request!" />
              <UpdateOfferButtons />
            </>
          )
      }

      {
        // Render notice if reader is not the same as listener and the reader has already submitted an offer for this request
        reqStatus.completed && correctReader && (
          <>
            <Notice message="You have completed this reading request!" />
          </>
        )
      }

      {
        // Render offers if logged in user is the listener
        correctListener() && <Offers offers={offers} />
      }

      {
        // Render link to /login if user is not logged in
        !userID && !wrongUser() && (
          <Link
            to="/login"
            className="btn btn-primary mb-16 self-start mx-8 my-1"
          >
            Offer to Read
          </Link>
        )
      }

      {
        // Render 'not available' notice if the user is not the reader and not the listener
        // and read request has been accepted or cancelled
        wrongUser() && (
          <Notice message="This read request is no longer available!" />
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
