import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

/** CONNECT to WebSocket */
const socket = io.connect("http://localhost:3001");
const room = 1; // TODO will need to create room based on both sender_id & recipient_id
const recipient_id = 2;
const sender_id = 6
// TODO "sender_id" is currently in MessagesController. Will need to get it from cookie

function ConversationsTest() {
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: `messages/${recipient_id}`,
      headers: {},
      data: {
        // This is the body part
        recipient_id,
        sender_id,
      },
    }).then((result) => {
      console.log(result.data)
      setMessagesData(result.data);
    }).catch(err => console.log(err.message))
  }, []);

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
      setMessagesData((list) => [...list, msgData.message]);
    });
  }, [socket]);

  /** SEND outgoing messages */
  const messageSubmitHandler = async () => {
    if (message !== "") {
      // SETUP Msg Data
      const messageData = {
        room: room,
        // author: username,
        message_text: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      // SEND Msg
      await socket.emit("send_message", messageData);
      axios({
        method: "post",
        url: "/messages",
        headers: {},
        data: {
          // This is the body part
          recipient_id,
          sender_id,
          message_text: messageData.message_text,
        },
      }); // TODO need .then.catch
      setMessagesData((list) => [...list, { message_text: message, id: 20 }]);
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

export default ConversationsTest;
