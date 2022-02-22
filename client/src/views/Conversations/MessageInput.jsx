import React, { useContext, useRef, useEffect, useState } from "react";
import MessageContext from "../../context/messageContext";
import { useParams } from "react-router";

function MessageInput(props) {
  const { conversation_id } = useParams();
  const [jitsyLink, setJitsyLink] = useState("");

  const {
    message,
    setMessage,
    sendMessageIfEnterPressed,
    setMessageSending,
    scrollToLatestMessage,
  } = useContext(MessageContext);
  const refInput = useRef(null);

  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const buttonClickHandler = () => {
    scrollToLatestMessage();
    setMessageSending(true);
    refInput.current.focus();
  };

  useEffect(() => {
    setJitsyLink(`https://meet.jit.si/storytime_${conversation_id}`);
  }, [conversation_id]);

  return (
    <div className="flex items-center" style={{ maxWidth: "90%" }}>
      <input
        style={{ maxWidth: "75%" }}
        type="text"
        placeholder=""
        className="text-base input input-bordered"
        onChange={messageChangeHandler}
        value={message}
        onKeyPress={sendMessageIfEnterPressed}
        ref={refInput}
        autoFocus
      />
      <button
        onClick={buttonClickHandler}
        className="btn-square text-neutral border-transparent bg-transparent"
      >
        <i className="fa-solid fa-paper-plane text-3xl"></i>
      </button>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={jitsyLink}
          className="btn-square text-neutral border-transparent bg-transparent"
        >
          <i className="fa fa-video-camera text-3xl" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default MessageInput;
