import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Offers from "../Offers";
import Error from "../shared/Error";
import UserCard from "../shared/UserCard";
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
  const [reader, setReader] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");
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
        if (request.reader_id) {
          const readerInfo = await axios.get(`../users/${request.reader_id}`);
          setReader(readerInfo.data.user);
        }

        if (userID) {
          const loggedInUserInfo = await axios.get(`../users/${userID}`);
          setLoggedInUser(JSON.stringify(loggedInUserInfo.data.user));
        }
        setError("");
      } catch (err) {
        setError("Error loading data");
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
    const readOffers = JSON.parse(loggedInUser).all_request_offers;
    if (!readOffers) return false;

    for (const offer of readOffers) {
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

  const whoCancelled = () => {
    if (listen.who_cancelled_id === listen.listener_id) {
      return "listener";
    }
    return "reader";
  };

  const chosenOffer = () => {
    const currentOffers = JSON.parse(offers);
    for (const offer of currentOffers) {
      if (listen.request_offer_id === offer.id) {
        return offer;
      }
    }
  };

  // different statuses of reading request
  const reqStatus = {
    accepted: listen.accepted_at !== null,
    active: listen.accepted_at && !listen.completed_at && !listen.cancelled_at,
    cancelled: listen.cancelled_at !== null,
    completed: listen.completed_at !== null,
    pending: !listen.accepted_at && !listen.completed_at,
  };

  return (
    <>
      {!error && (
        <div className="flex flex-col max-w-lg mx-auto rounded-sm mt-8">
          {/* ---------- RENDER USER CARD ---------- */}
          {
            // Show listener card if nobody is logged in
            !loggedInUser && <UserCard listen={listen} user={listener} />
          }
          {
            // Show listener card if the user is not the listener (creator of request)
            !correctListener() && <UserCard listen={listen} user={listener} />
          }
          {
            // Show listener card if the reader is viewing the request (TODO - this redundant?)
            correctReader() && <UserCard listen={listen} user={listener} />
          }
          {
            // Show listener card if the listener is viewing their request and it is pending
            correctListener() && reqStatus.pending && (
              <UserCard listen={listen} user={listener} />
            )
          }
          {
            // Show listener card if the listener is viewing their request and it was cancelled while pending
            correctListener() && reqStatus.cancelled && !listen.reader_id && (
              <UserCard listen={listen} user={listener} />
            )
          }
          {
            // Show reader card if the listener is viewing their request and it is accepted
            correctListener() && reqStatus.accepted && (
              <UserCard listen={listen} user={reader} />
            )
          }

          {/* ---------- RENDER REQUEST INFO ---------- */}

          {/* Info from reader's perspective: */}

          {reqStatus.pending && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              tagLine="would like to listen to"
              status="pending"
            />
          )}

          {reqStatus.completed && !correctListener() && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              tagLine="was listening to"
              status="completed"
            />
          )}

          {reqStatus.active && !correctListener() && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              tagLine="is listening to"
              status="active"
            />
          )}

          {reqStatus.cancelled && !correctListener() && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              tagLine="wanted to listen to"
              status="cancelled"
              whoCancelled={whoCancelled()}
            />
          )}

          {/* Info from listener's perspective: */}
          {
            // Listener cancelled a pending read request (no reader yet)
            reqStatus.cancelled && correctListener() && !listen.reader_id && (
              <ListenInfo
                listen={listen}
                totalOffers={totalOffers}
                tagLine="wanted to listen to"
                status="cancelled"
                whoCancelled={whoCancelled()}
              />
            )
          }

          {
            // Listener cancelled an active read request
            reqStatus.cancelled &&
              correctListener() &&
              listen.reader_id &&
              offers && (
                <ListenInfo
                  listen={listen}
                  offer={chosenOffer()}
                  tagLine="was reading"
                  status="cancelled"
                  whoCancelled={whoCancelled()}
                />
              )
          }

          {/* ---------- RENDER OFFER FORM ---------- */}

          {
            // Render form if reader is not the same as listener and has not yet submitted an offer for this request
            !wrongUser() &&
              loggedInUser &&
              !correctListener() &&
              !hasAlreadyOffered() && (
                <OfferSubmitForm
                  request_id={listenId}
                  setTotalOffers={setTotalOffers}
                />
              )
          }

          {/* ---------- RENDER NOTICES AND BUTTONS ---------- */}

          {
            // Render notice if reader is not the same as listener and the reader has already submitted an offer for this request
            reqStatus.pending &&
              loggedInUser &&
              !correctListener() &&
              hasAlreadyOffered() && (
                <div className="mb-24">
                  <Notice message="You have already submitted an offer for this request!" />
                  <UpdateOfferButtons />
                </div>
              )
          }

          {
            // Render notice if the logged in user is the reader of the request and the reading session has been completed
            reqStatus.completed && correctReader() && (
              <Notice
                className="mb-24"
                message="You have completed this reading request!"
              />
            )
          }

          {
            // Render cancel button if the logged in user is the reader of the request
            // and the request status is active (ongoing session)
            reqStatus.active && correctReader() && (
              <button className="m-3 self-center btn btn-primary">
                Cancel reading
              </button>
            )
          }

          {
            // Render 'not available' notice if the user is not the reader and not the listener
            // and read request has been accepted or cancelled
            wrongUser() && (
              <Notice
                className="mb-24"
                message="This read request is no longer available!"
              />
            )
          }

          {/* ---------- RENDER READ OFFERS ---------- */}

          {
            // Render offers if logged in user is the listener
            correctListener() && reqStatus.pending && (
              <Offers offers={offers} reqStatus={reqStatus} />
            )
          }

          {/* ---------- RENDER LINK TO LOGIN ---------- */}

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
        </div>
      )}

      {/* ---------- RENDER ERROR ---------- */}

      {
        // Render error if cannot fetch data
        error && <Error error={error} />
      }
    </>
  );
};
export default ListenExpand;
