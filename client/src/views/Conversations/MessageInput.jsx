import React, { useContext, useRef } from "react";
import MessageContext from "../../context/messageContext";

function MessageInput(props) {
  const { message, setMessage, sendMessageIfEnterPressed, setMessageSending } =
    useContext(MessageContext);
  const refInput = useRef(null);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const buttonClickHandler = () => {
    setMessageSending(true);
    refInput.current.focus();
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder=""
        className="text-base input input-bordered bg-slate-200"
        onChange={messageChangeHandler}
        value={message}
        onKeyPress={sendMessageIfEnterPressed}
        ref={refInput}
      />
      <button
        onClick={buttonClickHandler}
        className="btn-square text-neutral border-transparent bg-transparent"
      >
        <i class="fa-solid fa-paper-plane text-3xl"></i>
      </button>
    </div>
  );
}

export default MessageInput;
