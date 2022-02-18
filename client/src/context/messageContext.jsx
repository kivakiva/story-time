import React, { useState } from "react";

const MessageContext = React.createContext({
  message: undefined,
  setMessage: () => {},
  messageSending: undefined,
  setMessageSending: () => {},
  chatOpen: undefined,
  setChatOpen: () => {},
});

// Component
export const MessageProvider = (props) => {
  const [message, setMessage] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const sendMessageIfEnterPressed = (e) => {
    if (e.key === "Enter") {
      setMessageSending(true);
    }
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
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
