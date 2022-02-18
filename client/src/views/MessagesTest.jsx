import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// CONNECT to WebSocket
const socket = io.connect("http://localhost:3001");

function MessagesTest() {
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState("");

  const [convoInfo, setConvoInfo] = useState({
    sender_id: localStorage.getItem("userID"),
    sender_name: "",
    recipient_id: "",
    recipient_name: "",
    id: "",
  });

  //1. GET convoInfo (On page load ONLY)
  useEffect(() => {
    let sender_name;
    let recipient_name;

    const convo_id = window.location.pathname.split("/").slice(-1)[0];
    const sender_and_recipient_ids = convo_id.split("_");

    const recipient_id =
      convoInfo.sender_id === sender_and_recipient_ids[0]
        ? sender_and_recipient_ids[1]
        : sender_and_recipient_ids[0];

    axios
      .get(`/users/${convoInfo.sender_id}`)
      .then((result) => {
        sender_name = result.data.user.name;
        console.log(sender_name);
      })
      .then(() => {
        axios.get(`/users/${recipient_id}`).then((result) => {
          recipient_name = result.data.user.name;
          console.log(recipient_name);
          setConvoInfo((prev) => {
            return {
              ...prev,
              sender_name: sender_name,
              recipient_id: recipient_id,
              recipient_name: recipient_name,
              id: convo_id,
            };
          });
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  // 2. JOIN convo room & load messages
  useEffect(() => {
    socket.emit("join_room", convoInfo.id); // Join room

    axios // get messages
      .get(`/messages/${convoInfo.recipient_id}`)
      .then((result) => {
        console.log(result.data);
        setMessagesData(result.data);
      })
      .catch((err) => console.log(err.message));
  }, [convoInfo]);

  // RECEIVE incoming messages
  useEffect(() => {
    socket.on("receive_message", (msgData) => {
      console.log("RECEIVING MESSAGE!");
      console.log("msgData", msgData);
      setMessagesData((list) => [...list, msgData]);
    });
  }, [socket]);

  // SEND outgoing messages
  const messageSubmitHandler = async () => {
    if (message !== "") {
      // SETUP Msg Data
      const messageData = {
        room: convoInfo.id,
        recipient_id: convoInfo.recipient_id,
        sender_id: convoInfo.sender_id,
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
      }).catch((err) => console.log(err.message));

      // UPDATE sender messages (we WON'T be loading sent messages from api because of lag time)
      setMessagesData((list) => [...list, messageData]);
      setMessage("");
    }
  };

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      {messagesData.length > 0 &&
        messagesData.map((messageData) => {
          return (
            <div key={messageData.id}>
              <p>
                {messageData.sender_id == convoInfo.sender_id
                  ? convoInfo.sender_name
                  : convoInfo.recipient_name}
                :
              </p>
              <p>{messageData.message_text}</p>
            </div>
          );
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
