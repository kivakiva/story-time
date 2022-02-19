import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import Error from "./Error";

const UpdateOfferButtons = ({ offerID }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cancelOffer = async () => {
    try {
      await axios.delete(`/reads/${offerID}`);
      setError("");
      Store.addNotification({
        content: <Notification message="Offer cancelled" />,
        container: "center",
        animationIn: ["animate__animated animate__fadeIn"],
        animationOut: ["animate__animated animate__fadeOut"],
        dismiss: {
          duration: 2000,
        },
      });
      navigate(-1);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      <div className="flex p-1 mb-6 justify-center">
        <Link
          to={`/offer/${offerID}/edit`}
          className="btn btn-outline px-7 mx-1"
        >
          <AiFillEdit className="inline-block mr-2" />
          Edit
        </Link>
        <button onClick={cancelOffer} className="btn btn-outline mx-1">
          <ImCancelCircle className="inline-block mr-2" />
          Cancel
        </button>
      </div>
    </>
  );
};

export default UpdateOfferButtons;
