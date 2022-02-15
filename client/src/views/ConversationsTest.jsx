import React, { useEffect, useState } from "react";
import io from "socket.io-client";

/** CONNECT to WebSocket */
const socket = io.connect("http://localhost:3001");
const room = 1;

function ConversationsTest() {
  const [messages, setMessages] = useState(["Hello!", "Hi!"]);
  const [message, setMessage] = useState("");

  /** JOIN ROOM on Component Load */
  useEffect(() => {
    socket.emit("join_room", room);

    //! remember to cleanup/remove connection => w/ return?
  }, []);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  /** RECEIVE incoming messages */
  useEffect(() => {
    socket.on("receive_message", (msgData) => {
      console.log('msgData',msgData)
      setMessages((list) => [...list, msgData.message]);
    });
  }, [socket]);

  /** SEND outgoing messages */
  const messageSubmitHandler = async () => {
    if (message !== "") {
      // SETUP Msg Data
      const messageData = {
        room: room,
        // author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // SEND Msg
      await socket.emit("send_message", 
        messageData);
      setMessages((list) => [...list, message]);
      setMessage("");
    }
  };

  return (
    <div>
      {messages.map((message) => {
        return <p>{message}</p>;
      })}
      <input
        onChange={messageChangeHandler}
        type="text"
        placeholder="..."
        value={message}
      />
      <button onClick={messageSubmitHandler}>Submit</button>
    </div>
  );
}

export default ConversationsTest;
