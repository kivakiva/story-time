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
  const parsedConversations = testConversations.map((conversation) => (
    <Conversation key={conversation.id} {...conversation} />
  ));
  return (
    <div>
      <div className="flex flex-col w-full lg:flex-row divide-y">
        {parsedConversations}
      </div>
    </div>
  );
};
export default Conversations;
