import ConversationsItem from "./ConversationsItem";
import axios from "axios";
import { useState, useEffect } from "react";

const Conversations = (props) => {
  const [lastMessages, setLastMessages] = useState([]);

  const populateLatesMessages = (messages) => {
    const lastMessagesObj = {};
    for (let msg of messages) {
      const sender = msg.sender_id;
      const recipient = msg.recipient_id;

      const id_small = sender < recipient ? sender : recipient;
      const id_large = sender > recipient ? sender : recipient;

      const convoID = id_small + "_" + id_large;

      if (lastMessagesObj[convoID]) {
        if (
          new Date(msg.created_at) >
          new Date(lastMessagesObj[convoID].created_at)
        )
          lastMessagesObj[convoID] = { ...msg, convoID };
      } else {
        lastMessagesObj[convoID] = { ...msg, convoID };
      }
    }
    setLastMessages(
      Object.values(lastMessagesObj).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )
    );
  };

  useEffect(() => {
    console.log(lastMessages);
  }, [lastMessages]);

  useEffect(() => {
    axios.get("/messages").then((results) => {
      // console.log(results.data);
      populateLatesMessages(results.data);
    });
  }, []);

  let parsedConversations = [];

  if (lastMessages) {
    parsedConversations = lastMessages.map((message) => (
      <ConversationsItem key={message.id} {...message} />
    ));
  }

  return (
    <div>
      <div className="flex flex-col w-full lg:flex-row divide-y">
        {parsedConversations}
      </div>
    </div>
  );
};
export default Conversations;

/*
[
  {
    id: 63,
    message_text: 'dh',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:31:05.514Z
  },
]
*/
