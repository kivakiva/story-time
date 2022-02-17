import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

const UpdateOfferButtons = ({ offerID }) => {
  const navigate = useNavigate();

  const cancelOffer = () => {
    try {
      axios.delete(`/reads/${offerID}`);
      navigate("/myreads");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-1 justify-center">
      <button className="btn btn-primary px-7 mx-1">Edit</button>
      <button onClick={cancelOffer} className="btn btn-secondary mx-1">
        Cancel
      </button>
    </div>
  );
};

export default UpdateOfferButtons;
