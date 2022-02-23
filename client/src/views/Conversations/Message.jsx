import { Fragment, useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";
import Timeago from "react-timeago";
import Book from "../shared/Book";

const Message = (props) => {
  const { message_text, created_at, sender_id, userID, customization } = props;
  const customObj = JSON.parse(customization);
  const align = () => {
    if (userID == sender_id) {
      // return "self-end bg-chat-100 rounded-br-none";
      return "self-end bg-primary rounded-br-none";
    } else {
      // return "self-start bg-chat-200 rounded-bl-none";
      return "self-start bg-secondary rounded-bl-none";
    }
  };

  let message;
  if (!customObj) {
    message = message_text;
  } else if (customObj.mode === "accepted-offer") {
    const msg = customObj.data;
    message = (
      <div className="flex flex-col">
        <div className="mb-4">
          <b>{msg.listener_name}</b> accepted <b>{msg.reader_name}'s</b> offer
          to read
        </div>
        <Book title={customObj.data.book_title}></Book>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-base-100 w-full">
      <div
        style={{ color: "#1B3D2F" }}
        className={`p-3 mx-5 mt-6 border border-black mb-1 rounded-lg max-w-[65%] text-left break-words ${align()}`}
      >
        {message}
      </div>
      <div className="text-xs">
        <Timeago
          // formatter shows 'just now' instead of counting seconds
          formatter={(value, unit, suffix) => {
            if (unit === "second") {
              return "just now";
            } else {
              return value + " " + unit + (value > 1 ? "s" : "") + " " + suffix;
            }
          }}
          date={created_at}
        />
      </div>
    </div>
  );
};
export default Message;
