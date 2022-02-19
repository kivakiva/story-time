import React from "react";

const AcceptedRequestMessages = ({ request, offer }) => {
  const noRequestText = "The request was made without a message";
  const noOfferText = "The offer was made without a message";

  return (
    <div className="my-3 text-left">
      <p style={{ color: "#2F4858" }} className="font-semibold uppercase">
        Listener:
      </p>
      <p className="pb-2">{request || noRequestText}</p>
      <p style={{ color: "#2F4858" }} className="font-semibold uppercase">
        Reader:
      </p>
      <p>{offer || noOfferText}</p>
    </div>
  );
};

export default AcceptedRequestMessages;
