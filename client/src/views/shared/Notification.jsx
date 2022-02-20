import React from "react";

const Notification = ({ message }) => {
  return (
    <div className="card p-4 bg-accent-focus w-full border border-solid border-main-100">
      <p>{message}</p>
    </div>
    
  );
};

export default Notification;
