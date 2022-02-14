import React from "react";
import CardBase from "./CardBase";

function CardListenRequest(props) {
  return (
    <CardBase {...props}>
      <h2 className="card-title">{props.title}</h2>
      <p>{props.reader}</p>
      <p className="font-bold">{props.status}</p>
    </CardBase>
  );
}

export default CardListenRequest;
