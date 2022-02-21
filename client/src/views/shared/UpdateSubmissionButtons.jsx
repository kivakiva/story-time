import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Error from "./Error";
import capitalize from "../helpers/capitalize";
import displayNotification from "../helpers/displayNotification";

const UpdateSubmissionButtons = ({ id, type }) => {
  const userID = Number(localStorage.getItem("userID"));

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const urlForServer = type === "offer" ? `/reads/${id}` : `/listens/${id}`;
  const urlForClient = type === "offer" ? `/read/${id}` : `/listen/${id}`;

  const deleteSubmition = async () => {
    try {
      if (type === "offer") {
        await axios.delete(urlForServer);
      }
      if (type === "request") {
        await axios.put(urlForServer, {
          action: "CANCEL",
          who_cancelled_id: userID,
        });
      }
      setError("");
      displayNotification(`${capitalize(type)} deleted`);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      <div className="flex p-1 mb-6 justify-center">
        <Link to={`${urlForClient}/edit`} className="btn btn-outline px-7 mx-1">
          <AiFillEdit className="inline-block mr-2" />
          Edit
        </Link>
        <button onClick={deleteSubmition} className="btn btn-outline mx-1">
          <ImCancelCircle className="inline-block mr-2" />
          Delete
        </button>
      </div>
    </>
  );
};

export default UpdateSubmissionButtons;
