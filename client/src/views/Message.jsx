import Timeago from "react-timeago";
const Message = (props) => {
  const { message, datetimeSent, senderId } = props;
  const align = () => {
    if (Math.floor(Math.random() * 2) < 1) {
      return "self-end bg-secondary rounded-br-none";
    } else {
      return "self-start bg-primary rounded-bl-none";
    }
  };
  return (
    <div className="flex flex-col">
      <div
        style={{ color: "#1B3D2F" }}
        className={`p-3 m-5 rounded-lg ${align()}`}
      >
        {message}
      </div>
      <div>
        <Timeago date={datetimeSent} />
      </div>
    </div>
  );
};
export default Message;
