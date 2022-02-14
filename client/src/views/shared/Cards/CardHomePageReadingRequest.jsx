import React from "react";
import CardBase from "./CardBase";

function CardHomePageReadingRequest(props) {
  return (
    <CardBase {...props}>
      <div className="flex">
        <img
          className="object-cover w-20 h-20 rounded-full"
          src={props.listener_img_url}
          alt=""
        />
        <div className="m-2 flex flex-col">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.listener}</p>
        </div>
      </div>
    </CardBase>
  );
}

export default CardHomePageReadingRequest;
