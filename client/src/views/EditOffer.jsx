import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate, useParams } from "react-router";
import Error from "./shared/Error";

const EditOffer = () => {
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [offerText, setOfferText] = useState("");
  const { offerId } = useParams();

  if (!userID) {
    navigate("/login"); //if not logged in redirect to login
  }

  useEffect(() => {
    axios
      .get(`/reads/${offerId}`)
      .then((res) => {
        setError("");
        setOfferText(res.data.offer.offer_text);
      })
      .catch((err) => {
        console.log(err);
        setError("Error loading offer message");
      });
  }, [offerId]);

  const offerTextChangeHandler = (e) => {
    setOfferText(e.target.value);
  };

  const submitHandler = () => {
    axios
      .put(`/reads/${offerId}`, { offer_text: offerText })
      .then(() => {
        navigate(-1);
      })
      .catch((err) => {
        setError("Could not update offer. Try again later!");
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div>
        <h2 className="card-title">Edit Offer</h2>
        <div className="form-control w-full max-w-xs">
          <label className="label mt-4">My Offer Message</label>
          <textarea
            className="textarea h-24 textarea-bordered"
            value={offerText}
            onChange={offerTextChangeHandler}
          ></textarea>
          <div className="flex justify-center my-4">
            <button
              className="btn btn-outline m-2 px-6"
              onClick={submitHandler}
            >
              <AiFillEdit className="inline-block mr-2" />
              Save
            </button>
            <button
              className="btn btn-outline m-2"
              aria-pressed="true"
              onClick={() => navigate(-1)}
            >
              <ImCancelCircle className="inline-block mr-2" />
              Cancel
            </button>
          </div>
          {error && <Error error={error}></Error>}
        </div>
      </div>
    </div>
  );
};

export default EditOffer;
