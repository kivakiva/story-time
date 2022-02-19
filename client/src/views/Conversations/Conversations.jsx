import ConversationsItem from "./ConversationsItem";
import axios from "axios";
import { useState, useEffect } from "react";

const Conversations = (props) => {
  const testConversations = [
    {
      id: 1,
      name: "Abigail Breslin",
      lastMessage: "i'm free tomorrow at 4pm. does that work for you?",
      datetimeSent: "2021-12-25 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/ben-parker-OhKElOkQ3RE-unsplash.jpg",
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "yeah nice to meet you, talk soon!",
      datetimeSent: "2022-01-15 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/nrd-ZmmAnliy1d4-unsplash.jpg",
    },
    {
      id: 3,
      name: "Harry Holmes",
      lastMessage: "free to read soon?",
      datetimeSent: "2022-01-29 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/reza-biazar-eSjmZW97cH8-unsplash.jpg",
    },
    {
      id: 4,
      name: "Abigail Breslin",
      lastMessage: "i'm free tomorrow at 4pm. does that work for you?",
      datetimeSent: "2021-12-25 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/ben-parker-OhKElOkQ3RE-unsplash.jpg",
    },
    {
      id: 5,
      name: "John Smith",
      lastMessage: "yeah nice to meet you, talk soon!",
      datetimeSent: "2022-01-15 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/nrd-ZmmAnliy1d4-unsplash.jpg",
    },
    {
      id: 6,
      name: "Harry Holmes",
      lastMessage: "free to read soon?",
      datetimeSent: "2022-02-13 ",
      avatar:
        "https://cdn.lorem.space/images/face/.cache/500x0/reza-biazar-eSjmZW97cH8-unsplash.jpg",
    },
  ];

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
          lastMessagesObj[convoID] = {... msg, convoID };
      } else {
        lastMessagesObj[convoID] = {... msg, convoID };
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
  {
    id: 62,
    message_text: 'asdf',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:30:59.798Z
  },
  {
    id: 61,
    message_text: 'werter',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:30:50.879Z
  },
  {
    id: 60,
    message_text: 'ash',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:30:13.072Z
  },
  {
    id: 59,
    message_text: 'gd',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:30:08.148Z
  },
  {
    id: 58,
    message_text: 'asdfa',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:30:03.022Z
  },
  {
    id: 57,
    message_text: 'asdfa',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:27:11.493Z
  },
  {
    id: 56,
    message_text: 'dfgh',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:26:34.911Z
  },
  {
    id: 55,
    message_text: 'dgfhdfg',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:26:27.604Z
  },
  {
    id: 54,
    message_text: 'asdfagsdf',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:26:25.277Z
  },
  {
    id: 53,
    message_text: 'sdfgsdf',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:25:58.105Z
  },
  {
    id: 52,
    message_text: 'asdg',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:25:56.243Z
  },
  {
    id: 51,
    message_text: 'asdf',
    sender_id: 2,
    recipient_id: 1,
    created_at: 2022-02-18T07:19:06.317Z
  },
  {
    id: 30,
    message_text: 'volutpat quam pede lobortis ligula',
    sender_id: 2,
    recipient_id: 6,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 24,
    message_text: 'semper interdum mauris',
    sender_id: 6,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 23,
    message_text: 'sapien in sapien iaculis',
    sender_id: 3,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 21,
    message_text: 'nibh fusce',
    sender_id: 2,
    recipient_id: 6,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 16,
    message_text: 'vitae mattis nibh ligula nec sem',
    sender_id: 5,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 5,
    message_text: 'vitae nisl',
    sender_id: 6,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 1,
    message_text: 'morbi ut',
    sender_id: 6,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 3,
    message_text: 'platea dictumst maecenas',
    sender_id: 6,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  },
  {
    id: 36,
    message_text: 'in hac habitasse platea dictumst morbi',
    sender_id: 1,
    recipient_id: 2,
    created_at: 2022-02-18T07:18:36.226Z
  }
]
*/
