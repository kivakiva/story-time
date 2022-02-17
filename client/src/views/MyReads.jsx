import { useEffect, useState } from "react";
import axios from "axios";
import Reads from "./Reads";
import Listens from "./Listens";

const MyReads = (props) => {
  const [state, setState] = useState("listening");

  const listening = () => {
    setState("listening");
  };
  const reading = () => {
    setState("reading");
  };
  const userID = localStorage.getItem("userID");
  const [myReads, setMyReads] = useState([]);
  const [myListens, setMyListens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`../users/${userID}`)
      .then((res) => {
        setMyReads([...res.data.user.all_request_offers]);
        setMyListens([...res.data.user.all_read_requests]);
        setError("");
      })
      .catch((err) => {
        setError("Error loading data");
        setMyReads([]);
        console.log(err.response.data);
        console.log(err);
      });
  }, [userID]);

  const listenTab = () => {
    return state === "listening" ? "bg-base-200" : "";
  };

  const readTab = () => {
    return state === "reading" ? "bg-base-200" : "";
  };

  const tab = "rounded-t-xl px-3 pb-2";

  return (
    <main>
      <span onClick={() => listening()} className={`${tab} ${listenTab()}`}>
        <>Listening</>
      </span>{" "}
      <span onClick={() => reading()} className={`${tab} ${readTab()}`}>
        <>Reading</>
      </span>
      {state === "reading" && <Reads myReads={myReads} />}
      {state === "listening" && <Listens myListens={myListens} />}
    </main>
  );
};
export default MyReads;
