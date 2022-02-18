import React, { useContext } from "react";
import MessageContext from "../../context/messageContext";

function MessageInput() {
  const { message, setMessage, sendMessageIfEnterPressed } =
    useContext(MessageContext);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  return (
    <input
      onChange={messageChangeHandler}
      type="text"
      placeholder=""
      value={message}
      onKeyPress={sendMessageIfEnterPressed}
    />
  );
}

export default MessageInput;
