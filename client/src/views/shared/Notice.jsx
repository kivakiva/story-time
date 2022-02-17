import React from "react";

const Notice = ({ message, className }) => {
  return (
    <div className={`bg-base-300 p-4 mt-5 mb-3 ${className}`}>
      <p style={{ color: "#1B3D2F" }} className="tex-lg font-semibold">
        {message}
      </p>
    </div>
  );
};

export default Notice;
