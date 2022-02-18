import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Error from "../shared/Error";
import axios from "axios";

const ListenNew = (props) => {
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  if (!userID) {
    navigate("/login"); //if not logged in redirect to login
  }

  // user_id, request_text, book_title, online, in_person
  const [error, setError] = useState("");
  const [book_title, setBook_title] = useState("");
  const [request_text, setRequest_text] = useState("");
  const [online, setOnline] = useState(false);
  const [in_person, setIn_person] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [request, setRequest] = useState(null);
  const [listenerName, setListenerName] = useState("");

  const bookTitleChangeHandler = (e) => {
    setBook_title(e.target.value);
  };

  const requestTextChangeHandler = (e) => {
    setRequest_text(e.target.value);
  };

  const inPersonChangeHandler = () => {
    setIn_person((prev) => !prev);
  };

  const onlineChangeHandler = () => {
    setOnline((prev) => !prev);
  };

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
      method: "post",
      url: "/listens",
      headers: {},
      data: {
        request_text,
        book_title,
        online,
        in_person,
        listener_id: localStorage.getItem("userID"),
      },
    })
      .then((response) => {
        setSubmitted(true);
        setRequest(response.data.request);
      })
      .then(() => {
        return axios.get(`/users/${localStorage.getItem("userID")}`);
      })
      .then((res) => {
        console.log(res.data.user.name);
        setRequest((prev) => {
          return { ...prev, requester_name: res.data.user.name };
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="flex flex-col items-center p-8">
      {!submitted ? (
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
            />

            <label className="label mt-4">My Request Message</label>
            <textarea
              className="textarea h-24 textarea-bordered"
              value={request_text}
              onChange={requestTextChangeHandler}
            ></textarea>

            <div className="w-48 my-6">
              <div className="flex items-center  justify-between my-2">
                <label className="label">In Person</label>
                <div className="flex items-center">
                  <input
                    onClick={inPersonChangeHandler}
                    type="checkbox"
                    className="toggle"
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
                    onClick={onlineChangeHandler}
                    type="checkbox"
                    className="toggle"
                    value={online}
                  />
                  <i
                    class={`fa-solid fa-phone text-xl ml-3 w-4 ${
                      !online && "opacity-20"
                    }`}
                  ></i>
                </div>
              </div>
            </div>

            {error && <Error error={error}></Error>}

            <button className="btn btn-outline mb-16" onClick={submitHandler}>
              Submit Request
            </button>
          </div>
        </div>
      ) : (
        <div>
          {request && (
            <div>
              request submitted!
              <h2>Listen Request Details:</h2>
              <p>{request.requester_name}</p>
              <p>{request.book_title}</p>
              <p>{request.request_text}</p>
              <p>{request.online && "Online"}</p>
              <p>{request.in_person && "In Person"}</p>
              <button className="btn btn-outline">
                <Link to="/myreads">View in my Requests</Link>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ListenNew;
