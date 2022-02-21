import React from "react";
import { useNavigate } from "react-router";

const GoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <p className="text-lg font-semibold my-2">Nothing here</p>
      <button
        onClick={goBack}
        className="btn btn-outline my-2 self-center"
        to="/"
      >
        Go back
      </button>
    </div>
  );
};

export default GoBack;
