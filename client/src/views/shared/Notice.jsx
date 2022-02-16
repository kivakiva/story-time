import React from "react";

const Notice = ({ message }) => {
  return (
    <div className="bg-base-300 p-4 my-5 ">
      <p style={{ color: "#1B3D2F" }} className="tex-lg font-semibold">
        {message}
      </p>
    </div>
  );
};

export default Notice;
