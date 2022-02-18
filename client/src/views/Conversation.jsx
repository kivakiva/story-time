import Message from "./Message";
import { Link, useOutletContext } from "react-router-dom";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

// CONNECT to WebSocket
const socket = io.connect("http://localhost:3001");

const Conversation = (props) => {
  const [messagesData, setMessagesData] = useState([]);
  const [message, setMessage] = useState("");
  const userID = localStorage.getItem("userID");

  const [convoInfo, setConvoInfo] = useState({
    sender_id: userID,
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
      })
      .then(() => {
        return axios.get(`/users/${recipient_id}`).then((result) => {
          recipient_name = result.data.user.name;
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
      .catch((err) => {
        console.log("AXIOS REQUEST FAIL");
        console.log(err.message);
      });
  }, []);

  // 2. JOIN convo room & load messages
  useEffect(() => {
    socket.emit("join_room", convoInfo.id); // Join room

    if (convoInfo.recipient_id) {
      axios // get messages
        .get(`/messages/${convoInfo.recipient_id}`)
        .then((result) => {
          setMessagesData(result.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [convoInfo]);

  // RECEIVE incoming messages
  useEffect(() => {
    socket.on("receive_message", (msgData) => {
      console.log("RECEIVING MESSAGE!");
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

  let parsedMessages;
  if (messagesData) {
    parsedMessages = messagesData.map((messageData) => (
      <Message key={messageData.id} {...messageData} userID={userID} />
    ));
  }

  // Replace Nav with Chat form
  const { setIsMessaging } = useOutletContext();
  useEffect(() => {
    setIsMessaging(true);
  }, [setIsMessaging]);
  const back = () => {
    setIsMessaging(false);
  };

  return (
    <div>
      <div className="fixed left-0 top-0 bg-base-100 z-9 w-full h-24 "></div>
      <div className="fixed left-0 top-24 z-9 w-full h-8 bg-gradient-to-b from-base-100 via-base-100 to-transparent"></div>
      <div className="fixed left-0 right-0 ">
        <Link to="/conversations" onClick={() => back()}>
          <i className="fa-solid fa-angles-left  fixed left-0 pl-4 pt-2"></i>
        </Link>
        <span className="text-right">
          Chatting with{" "}
          <b>{convoInfo.recipient_name && convoInfo.recipient_name}</b>
        </span>
      </div>
      <div className="pt-8 pb-4">{parsedMessages}</div>
    </div>
  );
};
export default Conversation;

/*const testMessages = {
  partner: "Andy Newman",
  messages: [
    {
      id: 1,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "first hello",
    },
    {
      id: 2,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 3,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 4,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 5,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 6,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 7,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "hi nice to meet you",
    },
    {
      id: 8,
      sender_id: 1,
      time: "2022-01-15",
      message_text: "goodbye",
    },
  ],
};

*/
