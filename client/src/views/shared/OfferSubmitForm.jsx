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

    try {
      await axios.post("/reads", { offer_text: msg, request_id });
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
      <form className="mb-6 flex flex-col mt-3 mx-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="textarea h-24 textarea-secondary mb-4 mt-2"
          placeholder="Optional - My message to listener"
        ></textarea>
        <button
          type="submit"
          onClick={(e) => submitOffer(e, message)}
          className="btn btn-secondary border-2 border-solid border-slate-500"
        >
          Offer to Read
        </button>
      </form>
    </>
  );
};

export default OfferSubmitForm;
