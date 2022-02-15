import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

/** CONNECT to WebSocket */
const socket = io.connect("http://localhost:3001");

let sender_id = localStorage.getItem("userID");
let recipient_id;

function MessagesTest() {
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState("");

  const conversation_id = useLocation().pathname.split("/").slice(-1)[0];
  const conversation_ids_array = conversation_id.split("_");

  console.log();

  recipient_id =
    sender_id === conversation_ids_array[0]
      ? conversation_ids_array[1]
      : conversation_ids_array[0];

  console.log(sender_id, recipient_id);
  useEffect(() => {
    axios
      .get(`/messages/${recipient_id}`)
      .then((result) => {
        console.log(result.data);
        setMessagesData(result.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  /** JOIN ROOM on Component Load */
  useEffect(() => {
    socket.emit("join_room", conversation_id);

    //! remember to cleanup/remove connection => w/ return?
  }, []);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  /** RECEIVE incoming messages */
  useEffect(() => {
    socket.on("receive_message", (msgData) => {
      console.log("msgData", msgData);
      setMessagesData((list) => [...list, msgData]);
    });
  }, [socket]);

  /** SEND outgoing messages */
  const messageSubmitHandler = async () => {
    if (message !== "") {
      // SETUP Msg Data
      const messageData = {
        room: conversation_id,
        recipient_id,
        sender_id,
        message_text: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        id: Math.random(),
      };

      // SEND Msg
      await socket.emit("send_message", messageData);
      axios({
        method: "post",
        url: "/messages",
        headers: {},
        data: messageData,
      }); // TODO need .then.catch
      setMessagesData((list) => [...list, messageData]);
      setMessage("");
    }
  };

  return (
    <div>
      {messagesData.map((messageData) => {
        return <p key={messageData.id}>{messageData.message_text}</p>;
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

export default MessagesTest;
