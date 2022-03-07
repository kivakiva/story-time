import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Reads from "./Reads";
import Listens from "./MyListens";
import MyReadsContext from "../context/myReadsContext";

const MyReads = (props) => {
  const { currentTab, setCurrentTab, listening, reading } =
    useContext(MyReadsContext);

  const userID = localStorage.getItem("userID");
  const [myReads, setMyReads] = useState([]);
  const [myListens, setMyListens] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/users/${userID}`)
      .then((res) => {
        setMyReads([...res.data.user.all_request_offers]);
        setMyListens([...res.data.user.all_read_requests]);
        setError("");
      })
      .catch((err) => {
        setError("Error loading data");
        setMyReads([]);
        console.log(err.response.data);
        console.log(error);
      });
  }, [userID, error]);

  const listenTab = () => {
    return currentTab === "listening" ? "bg-base-200" : "";
  };

  const readTab = () => {
    return currentTab === "reading" ? "bg-base-200" : "";
  };

  const tab = "rounded-t-xl px-3 pb-2 pt-3 border border-b-base-200";

  return (
    <main>
      <div className="mt-6 -mb-1">
        <span
          onClick={() => listening()}
          className={`cursor-pointer ${tab} ${listenTab()}`}
        >
          <i className="fa-solid fa-headphones text-2xl mr-2"></i> Listening
        </span>
        <span
          onClick={() => reading()}
          className={`cursor-pointer ${tab} ${readTab()}`}
        >
          <i className="fa-solid fa-microphone text-2xl mr-2"></i> Reading
        </span>
      </div>
      {currentTab === "reading" && <Reads myReads={myReads} />}
      {currentTab === "listening" && <Listens myListens={myListens} />}
    </main>
  );
};
export default MyReads;
