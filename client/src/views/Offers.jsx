import React from "react";
import Offer from "./Offer";

const Offers = ({ offers }) => {
  let parsedOffers = "";
  if (offers) {
    parsedOffers = JSON.parse(offers).map((offer) => {
      console.log("offer :>> ", offer);
      console.log("typeof offer :>> ", typeof offer);
      return <Offer key={offer.id} offer={{ ...offer }} />;
    });
  }

  return <>{offers && <div className="my-8">{parsedOffers}</div>}</>;
};

export default Offers;
