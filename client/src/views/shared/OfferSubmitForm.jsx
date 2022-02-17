import axios from "axios";
import React, { useState } from "react";
import Error from "./Error";

const OfferSubmitForm = ({
  request_id,
  setTotalOffers,
  setIsOfferSubmitted,
}) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitOffer = async (e, msg) => {
    e.preventDefault();

    const body = { offer_text: msg, request_id };
    try {
      await axios.post("/reads", body);
      setError("");
      setIsOfferSubmitted(true);
      setTotalOffers((prev) => prev + 1);
    } catch (err) {
      setError("Error creating offer. Try again later!");
      console.log(err);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      <form className="mb-28 flex flex-col mt-3 mx-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea h-24 textarea-secondary mb-4 mt-2"
          placeholder="Optional - My message to listener"
        ></textarea>
        <button
          type="submit"
          onClick={(e) => submitOffer(e, message)}
          className="btn btn-primary"
        >
          Offer to Read
        </button>
      </form>
    </>
  );
};

export default OfferSubmitForm;
