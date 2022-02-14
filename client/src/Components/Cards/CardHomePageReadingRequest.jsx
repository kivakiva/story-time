import React from "react";
import CardBase from "./CardBase";

function CardHomePageReadingRequest(props) {
  return (
    <CardBase onClick={props.onClick}>
      <h2 class="card-title">{props.title}</h2>
      <p>{props.listener}</p>
    </CardBase>
  );
}

export default CardHomePageReadingRequest;
