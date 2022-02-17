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
  const [offer, setOffer] = useState("");
  const [chosenOffer, setChosenOffer] = useState("");
  const [listener, setListener] = useState({});
  const [reader, setReader] = useState({});
  const [loggedInUser, setLoggedInUser] = useState("");
  const [totalOffers, setTotalOffers] = useState(0);
  const [error, setError] = useState("");
  const [isOfferSubmitted, setIsOfferSubmitted] = useState(false);

  useEffect(() => {
    // get the new offer that a reader has just submitted
    const getOffer = (user, listen) => {
      const readOffers = user.all_request_offers;
      if (!readOffers) return null;

      for (const offer of readOffers) {
        if (offer.request_id === listen.id && offer.reader_id === userID) {
          setOffer(offer);
        }
      }
      return null;
    };

    const fetchData = async () => {
      try {
        const requestRes = await axios.get(`/listens/${listenId}`);
        const { request, offers } = requestRes.data.response;
        setListen(request);

        if (offers && offers.length) {
          setOffers(JSON.stringify(offers));
        }
        setTotalOffers(request.total_offers);

        if (
          request.request_offer_id &&
          (request.reader_id === userID || request.listener_id === userID)
        ) {
          const offer = await axios.get(`../reads/${request.request_offer_id}`);
          setChosenOffer(offer.data.offer);
        }

        const listenerInfo = await axios.get(`/users/${request.listener_id}`);
        setListener(listenerInfo.data.user);
        if (request.reader_id) {
          const readerInfo = await axios.get(`/users/${request.reader_id}`);
          setReader(readerInfo.data.user);
        }

        if (userID) {
          const loggedInUserInfo = await axios.get(`/users/${userID}`);
          setLoggedInUser(JSON.stringify(loggedInUserInfo.data.user));
          getOffer(loggedInUserInfo.data.user, request);
        }
        setError("");
      } catch (err) {
        setError("Error loading data");
        console.log(err);
      }
    };
    fetchData();
  }, [listenId, userID, isOfferSubmitted]);

  // get offer text if reader has submitted an offer for this request
  const alreadyOfferedText = () => {
    const readOffers = JSON.parse(loggedInUser).all_request_offers;
    if (!readOffers) return false;

    for (const offer of readOffers) {
      if (offer.request_id === listen.id && offer.reader_id === userID) {
        return offer.offer_text || "You have made an offer without a message";
      }
    }
    return null;
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

          {correctReader() && <UserCard listen={listen} user={listener} />}

          {
            // SHow listener card if request status is pending and reader has not submitted an offer
            !correctReader() && !correctListener() && reqStatus.pending && (
              <UserCard listen={listen} user={listener} />
            )
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
          {
            // Link to home if the request is not pending and the user is not associated with this request
            !reqStatus.pending && !correctListener() && !correctReader() && (
              <>
                <p className="text-lg font-semibold my-2">Nothing here</p>
                <Link className="btn btn-secondary self-center" to="/">
                  Home
                </Link>
              </>
            )
          }

          {reqStatus.pending && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              actionLine="would like to listen to"
              status="pending"
            />
          )}

          {reqStatus.completed && correctReader() && (
            <ListenInfo
              listen={listen}
              offer={chosenOffer}
              totalOffers={totalOffers}
              actionLine="was listening to you read"
              status="completed"
            />
          )}

          {reqStatus.active && correctReader() && (
            <ListenInfo
              listen={listen}
              offer={chosenOffer}
              totalOffers={totalOffers}
              actionLine="is listening to you read"
              status="active"
            />
          )}

          {reqStatus.cancelled && correctReader() && (
            <ListenInfo
              listen={listen}
              totalOffers={totalOffers}
              offer={chosenOffer}
              actionLine="was listening to you read"
              status="cancelled"
              whoCancelled={whoCancelled()}
            />
          )}

          {/* Info from listener's perspective: */}
          {
            // Listener cancelled their pending read request (no reader yet)
            reqStatus.cancelled && correctListener() && !listen.reader_id && (
              <ListenInfo
                listen={listen}
                totalOffers={totalOffers}
                actionLine=" you wanted to listen to"
                status="cancelled"
                whoCancelled={whoCancelled()}
              />
            )
          }

          {
            // Listener cancelled their active read request
            reqStatus.cancelled &&
              correctListener() &&
              listen.reader_id &&
              offers && (
                <ListenInfo
                  listen={listen}
                  totalOffers={totalOffers}
                  offer={chosenOffer}
                  actionLine="was reading to you."
                  status="cancelled"
                  whoCancelled={whoCancelled()}
                />
              )
          }

          {
            // Listener viewing their completed read request
            reqStatus.completed && correctListener() && (
              <ListenInfo
                listen={listen}
                totalOffers={totalOffers}
                offer={chosenOffer}
                actionLine="was reading to you."
                status="completed"
              />
            )
          }

          {
            // Listener viewing their active read request
            reqStatus.active && correctListener() && (
              <ListenInfo
                listen={listen}
                totalOffers={totalOffers}
                offer={chosenOffer}
                actionLine="is reading to you."
                status="active"
              />
            )
          }

          {/* ---------- RENDER OFFER FORM ---------- */}

          {
            // Render form if reader is not the same as listener and has not yet submitted an offer for this request
            loggedInUser &&
              reqStatus.pending &&
              !correctListener() &&
              !alreadyOfferedText() &&
              !isOfferSubmitted && (
                <OfferSubmitForm
                  request_id={listenId}
                  setTotalOffers={setTotalOffers}
                  setIsOfferSubmitted={setIsOfferSubmitted}
                />
              )
          }

          {/* ---------- RENDER NOTICES AND BUTTONS ---------- */}

          {
            // Render notice if reader is not the same as listener and the reader has already submitted an offer for this request
            reqStatus.pending &&
              loggedInUser &&
              !correctListener() &&
              alreadyOfferedText() && (
                <div>
                  <div className="bg-base-300 p-4 px-10 mt-5 mb-3 text-left">
                    <p className="font-semibold">Your offer message:</p>
                    <p>{alreadyOfferedText()}</p>
                  </div>
                  <UpdateOfferButtons offerID={offer.id} />
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
            // or the listener(creator) of the request
            // and the request status is active (ongoing session)
            reqStatus.active && (correctReader() || correctListener()) && (
              <button className="m-3 self-center btn btn-primary">
                Cancel reading
              </button>
            )
          }

          {/* ---------- RENDER READ OFFERS ---------- */}

          {
            // Render offers if logged in user is the listener and the request status is 'pending'
            correctListener() && reqStatus.pending && (
              <Offers offers={offers} reqStatus={reqStatus} />
            )
          }

          {/* ---------- RENDER LINK TO LOGIN ---------- */}

          {
            // Render link to /login if user is not logged in
            !userID && (
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
