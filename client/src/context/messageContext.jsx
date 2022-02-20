import React, { useState, useRef } from "react";

const MessageContext = React.createContext({
  message: undefined,
  setMessage: () => {},
  messageSending: undefined,
  setMessageSending: () => {},
  chatOpen: undefined,
  setChatOpen: () => {},
  messagesEndRef: undefined,
  scrollToLatestMessage: () => {},
});

// Component
export const MessageProvider = (props) => {
  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // if RETURN/ENTER key pressed
  const sendMessageIfEnterPressed = (e) => {
    if (e.key === "Enter") {
      setMessageSending(true);
    }
  };

  // SCROLL DOWN to latest message when message is sent/received
  const scrollToLatestMessage = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MessageContext.Provider
      value={{
        message,
        setMessage,
        messageSending,
        setMessageSending,
        sendMessageIfEnterPressed,
        chatOpen,
        setChatOpen,
        messagesEndRef,
        scrollToLatestMessage,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
