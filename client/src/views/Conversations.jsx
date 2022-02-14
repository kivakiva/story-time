import Conversation from "./Conversation";
import axios from "axios";

const Conversations = (props) => {
  // const conversations = [];
  axios
    .get("./users/")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
  const testConversations = [
    {
      id: 1,
      name: "John Smith",
      lastMessage: "free to read soon?",
      datetimeSent: "2021-01-15 15:32 UTC",
    },
    {
      id: 2,
      name: "John Smith",
      lastMessage: "free to read soon?",
      datetimeSent: "2021-01-15 15:32 UTC",
    },
    {
      id: 3,
      name: "John Smith",
      lastMessage: "free to read soon?",
      datetimeSent: "2021-01-15 15:32 UTC",
    },
  ];
  const parsedConversations = testConversations.map((conversation) => (
    <Conversation key={conversation.id} {...conversation} />
  ));
  return (
    <div>
      <p>Conversations</p>
    </div>
  );
};
export default Conversations;
