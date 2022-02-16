import axios from "axios";
import React, { useState } from "react";
import Error from "./Error";
import UpdateOfferButtons from "./UpdateOfferButtons";

const OfferSubmitForm = ({ request_id, setTotalOffers }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitOffer = async (e, msg) => {
    e.preventDefault();

    const body = { offer_text: msg, request_id };
    try {
      await axios.post("../reads", body);
      setError("");
      setIsSubmitted(true);
      setTotalOffers((prev) => prev + 1);
    } catch (err) {
      setError("Error creating offer. Try again later!");
      console.log(err);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      {!isSubmitted && (
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
      )}
      {isSubmitted && (
        <div className="bg-accent p-4 mt-8 mb-24">
          <p style={{ color: "#1B3D2F" }} className="font-semibold  text-lg ">
            Offer submitted!
          </p>
          <UpdateOfferButtons />
        </div>
      )}
    </>
  );
};

export default OfferSubmitForm;
