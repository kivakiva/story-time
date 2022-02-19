import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleListen from "./SingleListen";
import { TiArrowDownOutline } from "react-icons/ti";
import Error from "./shared/Error";

const PublicListens = () => {
  const userID = localStorage.getItem("userID");
  const [allListens, setAllListens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`../listens`)
      .then((res) => {
        setAllListens([...res.data.readRequests]);
        setError("");
      })
      .catch((err) => {
        setError("Error loading data");
        setAllListens([]);
        console.log(err.response.data);
        console.log(err);
      });
  }, []);

  const parsedListens = [];
  allListens.forEach((listen) => {
    if (!listen.accepted_at && !listen.cancelled_at) {
      parsedListens.push(<SingleListen key={listen.id} {...listen} />);
    }
  });

  return (
    <>
      {!userID && (
        <div
          style={{ color: "#1B3D2F" }}
          className="card m-5 text-primary-content"
        >
          <div className="card-body">
            <h2 className="card-title text-3xl">Welcome!</h2>
            <p className="font-semibold m-1 mt-3 text-xl">
              Here at Story Time we connect readers and listeners together. If
              you want to read to someone, check out the requests below!
            </p>
            <p className="m-auto text-4xl pt-2">
              <TiArrowDownOutline />
            </p>
          </div>
        </div>
      )}

      <div style={{ color: "#7A1C00" }} className="font-bold m-1 mt-8">
        <i className="fa-solid fa-microphone"></i> Reading Requests
      </div>
      <div className="m-2 flex items-center flex-col justify-evenly">
        {parsedListens}
      </div>
      {error && <Error error={error} />}
      {userID && (
        <Link
          className="mb-6 btn btn-lg btn-secondary border-2 border-solid border-slate-500"
          to="/listen/create"
        >
          Create read request
        </Link>
      )}
      {!userID && (
        <Link
          className="mb-6 btn btn-lg btn-secondary border-2 border-solid border-slate-500"
          to="/login"
        >
          Create read request
        </Link>
      )}
    </>
  );
};
export default PublicListens;
