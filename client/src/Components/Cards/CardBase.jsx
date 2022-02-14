import React from "react";

function CardBase(props) {
  const { onClick, children } = props;
  return (
    <div onClick={onClick} class="card lg:card-side card-bordered">
      <div class="card-body">
        <p>{children}</p>
      </div>
    </div>
  );
}

export default CardBase;
