import Message from "./Message";

const Messages = (props) => {
  const testMessages = {
    partner: "Andy Newman",
    messages: [
      {
        id: 1,
        senderId: 1,
        datetimeSent: "2022-01-15",
        message: "hi nice to meet you",
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
        message: "hi nice to meet you",
      },
    ],
  };
  const parsedMessages = testMessages.messages.map((message) => (
    <Message key={message.id} {...message} />
  ));
  return <div>{parsedMessages}</div>;
};
export default Messages;
