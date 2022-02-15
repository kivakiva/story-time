import Read from "./myreads/Read";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PublicListen from "./shared/PublicListen";
import { TiArrowDownOutline } from "react-icons/ti";

const PublicReads = (props) => {
  const userID = localStorage.getItem("userID");
  const [allListens, setAllListens] = useState([]);

  useEffect(() => {
    axios
      .get(`../listens`)
      .then((res) => {
        console.log(res.data);
        setAllListens([...res.data.readRequests]);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  }, []);

  const parsedListens = allListens.map((listen) => {
    return <PublicListen key={listen.id} {...listen} />;
  });

  return (
    <>
      {!userID && (
        <div style={{ color: "#1B3D2F" }} class="card m-5 text-primary-content">
          <div class="card-body">
            <h2 class="card-title text-3xl">Welcome!</h2>
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
      <div className="m-2 flex flex-wrap">{parsedListens}</div>
      {userID && (
        <Link className="mb-16 btn btn-lg btn-primary" to="/listen/create">
          Create read request
        </Link>
      )}
      {!userID && (
        <Link className="mb-16 btn btn-lg btn-primary" to="/login">
          Create read request
        </Link>
      )}
    </>
  );
};
export default PublicReads;
