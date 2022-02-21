import { useNavigate, Link, useLocation } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { useState, useContext, useEffect } from "react";
import ListenContext from "../../context/listenContext";
import Error from "../shared/Error";
import axios from "axios";

const ListenNewOrEdit = (props) => {
  const { pathname } = useLocation();
  const requestID = pathname.split("/")[2];
  const { mode /* 'new' or 'edit */ } = props;
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  if (!userID) {
    navigate("/login"); //if not logged in redirect to login
  }

  // user_id, request_text, book_title, online, in_person
  const [book_title, setBook_title] = useState("");
  const [request_text, setRequest_text] = useState("");
  const [online, setOnline] = useState(false);
  const [in_person, setIn_person] = useState(false);
  const [editQueried, setEditQueried] = useState(false);
  const [listenerID, setListenerID] = useState("");

  const bookTitleChangeHandler = (e) => {
    setBook_title(e.target.value);
  };
  const requestTextChangeHandler = (e) => {
    setRequest_text(e.target.value);
  };
  const inPersonChangeHandler = (e) => {
    setIn_person((prev) => !prev);
  };
  const onlineChangeHandler = (e) => {
    setOnline((prev) => !prev);
  };

  const [error, setError] = useState("");

  // if edit then query current request
  useEffect(() => {
    if (mode === "edit") {
      axios.get(`/listens/${requestID}`).then((res) => {
        const request = res.data.response.request;
        setBook_title(request.book_title);
        setRequest_text(request.request_text);
        setOnline(request.online);
        setIn_person(request.in_person);
        setEditQueried(true);
        setListenerID(request.listener_id);
      });
    }
  }, []);

  const submitHandler = () => {
    setError("");
    if (!online && !in_person) {
      setError(
        "Please check at least one of the options, in person and/or online"
      );
      return;
    }

    if (!book_title) {
      setError("Please enter a book title");
      return;
    }

    axios({
      method: mode === "new" ? "post" : "put", // new vs edit
      url: `/listens/${mode !== "new" ? requestID : ""}`, // new vs edit
      headers: {},
      data: {
        action: mode === "edit" ? "UPDATE" : "", // new vs edit
        request_text,
        book_title,
        online,
        in_person,
        listener_id: localStorage.getItem("userID"),
      },
    })
      .then((res) => {
        navigate(`/listen/${res.data.request.id}`);
      })
      .catch((err) => console.log(err.message));
  };

  return listenerID == userID || mode === "new" ? (
    <div className="flex flex-col items-center p-8">
      <div>
        <h2 className="card-title">
          <i className="fa-solid fa-headphones mr-2"></i> My Listening Request
        </h2>

        <div className="form-control w-full max-w-xs">
          <label className="label mt-4">Book Title</label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={book_title}
            placeholder=""
            onChange={bookTitleChangeHandler}
            autoFocus
          />

          <label className="label mt-4">My Request Message</label>
          <textarea
            className="textarea h-24 textarea-bordered"
            value={request_text}
            onChange={requestTextChangeHandler}
          ></textarea>

          {(mode === "new" || editQueried) && (
            <div className="w-48 my-6">
              <div className="flex items-center  justify-between my-2">
                <label className="label">In Person</label>
                <div className="flex items-center">
                  <input
                    defaultChecked={in_person}
                    onClick={inPersonChangeHandler}
                    type="checkbox"
                    className="toggle active"
                    value={in_person}
                  />
                  <i
                    className={`fa-solid fa-person-walking text-3xl ml-3 w-4 ${
                      !in_person && "opacity-20"
                    }`}
                  ></i>
                </div>
              </div>
              <div className="flex items-center justify-between my-2">
                <label className="label">Online</label>
                <div className="flex items-center">
                  <input
                    defaultChecked={online}
                    onClick={onlineChangeHandler}
                    type="checkbox"
                    className="toggle"
                    value={online}
                  />

                  <i
                    className={`fa-solid fa-phone text-xl ml-3 w-4 ${
                      !online && "opacity-20"
                    }`}
                  ></i>
                </div>
              </div>
            </div>
          )}

          {error && <Error error={error}></Error>}
          <div className="flex flex-col">
            <button className="btn btn-outline m-2" onClick={submitHandler}>
              {mode === "edit" ? "Save Edit" : "Submit Request"}
            </button>
            <button
              className="btn btn-outline m-2"
              aria-pressed="true"
              onClick={() => navigate(-1)}
            >
              <ImCancelCircle className="inline-block mr-2" />
              {mode === "edit" ? "Discard Changes" : "Cancel Request"}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Nothing to see here</div>
  );
};
export default ListenNewOrEdit;
