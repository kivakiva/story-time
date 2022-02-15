import React from "react";
import Offer from "./Offer";

const Offers = ({ offers }) => {
  let parsedOffers = "";
  console.log("offers :>> ", offers);
  if (offers) {
    parsedOffers = JSON.parse(offers).map((offer) => {
      console.log("offer :>> ", offer);
      console.log("typeof offer :>> ", typeof offer);
      return <Offer key={offer.id} offedr={{ ...offer }} />;
    });
  }

  return <>{offers && <div className="mb-16">{parsedOffers}</div>}</>;
};

export default Offers;
