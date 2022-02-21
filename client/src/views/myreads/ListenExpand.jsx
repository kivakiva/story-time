import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Offers from "../Offers";
import Error from "../shared/Error";
import UserCard from "../shared/UserCard";
import ListenInfo from "../shared/ListenInfo";
import OfferSubmitForm from "../shared/OfferSubmitForm";
import UpdateSubmissionButtons from "../shared/UpdateSubmissionButtons";
import Notice from "../shared/Notice";
import Timeago from "react-timeago";
import { useNavigate } from "react-router";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import Notification from "../shared/Notification";
import Book from "../shared/Book";

const ListenExpand = () => {
  const userID = Number(localStorage.getItem("userID"));
  const { listenId } = useParams();
  const navigate = useNavigate();

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
        return offer.offer_text || "You have made the offer without a message";
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
    pending:
      !listen.accepted_at && !listen.completed_at && !listen.cancelled_at,
  };

  const cancelReading = async () => {
    try {
      await axios.put(`/listens/${listen.id}`, {
        action: "CANCEL",
        who_cancelled_id: userID,
      });
      setError("");
      Store.addNotification({
        content: <Notification message="Reading cancelled" />,
        container: "center",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
          duration: 2000,
        },
      });
      navigate("/myreads");
    } catch (err) {
      setError("Could not cancel reading! Try again later");
      console.log(err);
    }
  };

  const completeReading = async () => {
    try {
      await axios.put(`/listens/${listen.id}`, {
        action: "COMPLETE",
      });
      setError("");
      Store.addNotification({
        content: <Notification message="Reading completed" />,
        container: "center",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
          duration: 2000,
        },
      });
      navigate("/myreads");
    } catch (err) {
      setError("Could not complete the reading! Try again later.");
      console.log(err);
    }
  };

  const goBack = () => {
    navigate(-1);
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
            // Show listener card if the listener is viewing their request and it was cancelled while pending
            correctListener() && reqStatus.cancelled && !listen.reader_id && (
              <UserCard listen={listen} user={listener} />
            )
          }
          {
            // Show reader card if the listener is viewing their request and it is accepted
            // (active, cancelled or completed)
            correctListener() && reqStatus.accepted && (
              <UserCard listen={listen} user={reader} />
            )
          }

          {/* ---------- RENDER REQUEST INFO ---------- */}

          {/* Info from reader's perspective: */}

          {reqStatus.pending && !correctListener() && (
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
            // Link to home if the request is not pending and the user is not associated with this request
            !reqStatus.pending && !correctListener() && !correctReader() && (
              <>
                <p className="text-lg font-semibold my-2">Nothing here</p>
                <button
                  onClick={goBack}
                  className="btn btn-outline my-2 self-center"
                  to="/"
                >
                  Go back
                </button>
              </>
            )
          }

          {
            // Render notice if reader is not the same as listener and the reader has already submitted an offer for this request
            reqStatus.pending &&
              loggedInUser &&
              !correctListener() &&
              alreadyOfferedText() && (
                <div>
                  <div className="bg-base-300 p-4 px-10 mt-5 mb-3 text-left">
                    <p className="font-semibold">Your offer:</p>
                    <p>{alreadyOfferedText()}</p>
                  </div>
                  <UpdateSubmissionButtons id={offer.id} type={"offer"} />
                </div>
              )
          }

          {
            // Render notice if the logged in user is the reader of the request and the reading session has been completed
            reqStatus.completed && correctReader() && (
              <Notice message="You have completed this reading request!" />
            )
          }

          <div className="m-1 mb-6">
            {
              // Render complete button if the logged in user is the listener(creator) of the request
              // and the request status is active (ongoing session)
              reqStatus.active && correctListener() && (
                <button
                  onClick={completeReading}
                  className="mx-1 btn btn-secondary border-2 border-solid border-main-100"
                >
                  Complete
                </button>
              )
            }

            {
              // Render cancel button if the logged in user is the reader of the request
              // or the listener(creator) of the request
              // and the request status is active (ongoing session)
              reqStatus.active && (correctReader() || correctListener()) && (
                <button
                  onClick={cancelReading}
                  className="mx-1 px-6 btn btn-active "
                >
                  Cancel
                </button>
              )
            }
          </div>

          {/* ---------- RENDER READ OFFERS ---------- */}

          {
            // Render offers if logged in user is the listener and the request status is 'pending'
            correctListener() && reqStatus.pending && (
              <div className="my-2 mx-8">
                <div className="mb-4">
                  <p className="text-xl mb-6 font-semiboldgit d">
                    Your request to listen to
                  </p>
                  <Book title={listen.book_title} />
                  <p>
                    <span>made </span>
                    <Timeago date={listen.created_at} />
                  </p>
                </div>
                <UpdateSubmissionButtons id={listen.id} type={"request"} />

                {offers ? (
                  <Offers offers={offers} reqStatus={reqStatus} />
                ) : (
                  <p className="font-semibold">No offers yet!</p>
                )}
              </div>
            )
          }

          {/* ---------- RENDER LINK TO LOGIN ---------- */}

          {
            // Render link to /login if user is not logged in
            !userID && reqStatus.pending && (
              <Link
                to="/login"
                className="btn btn-secondary border-2 border-solid border-slate-500 mb-6 self-start mx-8 my-1"
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
