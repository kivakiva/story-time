import React from "react";

function CardBase(props) {
  return (
    <div {...props} className="card lg:card-side card-bordered">
      <div className="card-body">{props.children}</div>
    </div>
  );
}

export default CardBase;
