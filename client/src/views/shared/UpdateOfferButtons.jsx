import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router";

const UpdateOfferButtons = ({ offerID }) => {
  const navigate = useNavigate();

  const cancelOffer = () => {
    try {
      axios.delete(`/reads/${offerID}`);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-1 mb-6 justify-center">
      <button className="btn btn-outline px-7 mx-1">
        <AiFillEdit className="inline-block mr-2" />
        Edit
      </button>
      <button onClick={cancelOffer} className="btn btn-outline mx-1">
        <ImCancelCircle className="inline-block mr-2" />
        Cancel
      </button>
    </div>
  );
};

export default UpdateOfferButtons;
