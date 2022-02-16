import Message from "./Message";

const Conversation = (props) => {
  const testMessages = {
    partner: "Andy Newman",
    messages: [
      {
        id: 1,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "first hello",
      },
      {
        id: 2,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 3,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 4,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 5,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 6,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 7,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
      },
      {
        id: 8,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "goodbye",
      },
    ],
  };
  const parsedMessages = testMessages.messages.map((message) => (
    <Message key={message.id} {...message} />
  ));
  return (
    <div>
      <div className="fixed left-0 top-0 bg-base-100 z-9 w-full h-24 "></div>
      <div className="fixed left-0 top-24 z-9 w-full h-8 bg-gradient-to-b from-base-100 via-base-100 to-transparent"></div>
      <div className="fixed left-0 right-0 ">
        Chatting with <b>Andy Newman</b>
      </div>
      <div className="pt-8 pb-4">{parsedMessages}</div>
    </div>
  );
};
export default Conversation;
