import Message from "./Message";

import React, { useEffect, useState, useContext } from "react";
import MessageContext from "../../context/messageContext";
import io from "socket.io-client";
import axios from "axios";

const Conversation = (props) => {
  const [messagesData, setMessagesData] = useState([]);
  const userID = localStorage.getItem("userID");
  const [socket, setSocket] = useState();

  const {
    message,
    setMessage,
    messageSending,
    setMessageSending,
    setChatOpen,
    messagesEndRef,
    scrollToLatestMessage,
  } = useContext(MessageContext);

  const [convoInfo, setConvoInfo] = useState({
    sender_id: userID,
    sender_name: "",
    recipient_id: "",
    recipient_name: "",
    image_url: "",
    id: "",
  });

  //1. ON PAGE LOAD - GET convoInfo & create WebSocket Connection
  useEffect(() => {
    let sender_name;
    let recipient_name;
    let image_url;

    // 1.1 parse last string in url to get sender & recipient IDs
    const convo_id = window.location.pathname.split("/").slice(-1)[0];
    const sender_and_recipient_ids = convo_id.split("_");

    const recipient_id =
      convoInfo.sender_id === sender_and_recipient_ids[0]
        ? sender_and_recipient_ids[1]
        : sender_and_recipient_ids[0];

    // 1.2 get the rest of the convoInfo using sender & recipient IDs
    axios
      .get(`/api/users/${convoInfo.sender_id}`)
      .then((result) => {
        sender_name = result.data.user.name;
      })
      .then(() => {
        return axios.get(`/api/users/${recipient_id}`).then((result) => {
          recipient_name = result.data.user.name;
          image_url = result.data.user.image_url;

          setConvoInfo((prev) => {
            return {
              ...prev,
              sender_name: sender_name,
              recipient_id: recipient_id,
              recipient_name: recipient_name,
              image_url,
              id: convo_id,
            };
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });

    // CONNECT to WebSocket
    setSocket(() => {
      return io.connect("/"); // connect to backend home route
    });

    // close WebSocket on cleanup
    return () => {
      setSocket((prevSocket) => prevSocket.close());
    };
  }, []);

  // 2. ON PAGE LOAD - JOIN convo room & load messages
  useEffect(() => {
    if (socket) {
      socket.emit("join_room", convoInfo.id); // Join room

      // load messages ONLY when we have recipient ID
      if (convoInfo.recipient_id) {
        axios // get messages
          .get(`/api/messages/${convoInfo.recipient_id}`)
          .then((result) => {
            setMessagesData(result.data);
          })
          .catch((err) => console.log(err.message));
      }
    }
  }, [convoInfo]);

  // 3. RECURRING - RECEIVE incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (msgData) => {
        setMessagesData((list) => [...list, msgData]);
      });
    }
  }, [socket]);

  // 4. RECURRING - SEND outgoing messages
  const messageSubmitHandler = async () => {
    if (message !== "" && socket) {
      // 4.1 - SETUP Msg Data
      const messageData = {
        room: convoInfo.id,
        recipient_id: convoInfo.recipient_id,
        sender_id: convoInfo.sender_id,
        message_text: message,
        created_at: new Date(),
        id: Math.random(),
        customization: null,
      };

      // 4.2 - SEND Msg + Save to DB
      await socket.emit("send_message", messageData);

      // Save to DB
      axios({
        method: "post",
        url: "/api/messages",
        headers: {},
        data: messageData,
      }).catch((err) => console.log(err.message));

      // UPDATE sender messages (we WON'T be loading sent messages from api because of lag time)
      // instead we'll assume the message was sent & created successfully and update it client side
      setMessagesData((list) => [...list, messageData]);
      setMessage("");
    }
  };

  // Trigger message sending when MessageInput (in Footer) submits
  useEffect(() => {
    if (messageSending) {
      messageSubmitHandler();
      setMessageSending(false);
    }
  }, [messageSending]);

  // Trigger replacement of Nav Bar with MessageInput
  useEffect(() => {
    setChatOpen(true);
    return () => {
      setChatOpen(false);
    };
  }, []);

  useEffect(() => {
    scrollToLatestMessage(); // useEffect for scroll down
  }, [messagesData]);

  // MAP out MESSAGES for rendering
  let parsedMessages = [];
  if (messagesData) {
    parsedMessages = messagesData.map((messageData) => (
      <Message key={messageData.id} {...messageData} userID={userID} />
    ));
  }
  return (
    <div className="w-full">
      <div className="fixed left-0 top-0 bg-base-100 z-9 w-full h-24 "></div>
      <div className="fixed top-24 z-9 w-full h-28 bg-gradient-to-b from-base-100 via-base-100 to-transparent"></div>
      <div className="fixed flex items-start justify-start px-6">
        {convoInfo.image_url && (
          <img
            className="border w-28 h-28 rounded-full object-cover ml-2 mt-1 mr-4 ring ring-primary ring-offset-base-100 ring-offset-2"
            src={convoInfo.image_url}
            alt=""
          />
        )}
        <span className="text-left">
          Chatting with{" "}
          <b className="whitespace-nowrap">
            {convoInfo.recipient_name && convoInfo.recipient_name}
          </b>
        </span>
      </div>
      <div className="pt-28 pb-4">{parsedMessages}</div>
      <div /* for scrolling to bottom */
        className="mb-24"
        ref={messagesEndRef}
      />
    </div>
  );
};
export default Conversation;
