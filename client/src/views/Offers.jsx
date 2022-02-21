import React from "react";
import Offer from "./Offer";

const Offers = ({ offers, book_title }) => {
  let parsedOffers = "";
  if (offers) {
    parsedOffers = JSON.parse(offers).map((offer) => {
      return (
        <Offer key={offer.id} offer={{ ...offer }} book_title={book_title} />
      );
    });
  }

  return <>{offers && <div className="my-8">{parsedOffers}</div>}</>;
};

export default Offers;
