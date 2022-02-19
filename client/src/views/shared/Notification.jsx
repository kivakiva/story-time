import React from "react";

const Notification = ({ message }) => {
  return (
    <div className="py-3 bg-base-100 w-full border border-solid border-black">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
