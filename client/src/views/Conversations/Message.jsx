import Timeago from "react-timeago";
const Message = (props) => {
  const { message_text, time, sender_id, userID } = props;
  const align = () => {
    if (userID == sender_id) {
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
        {message_text}
      </div>
      <div>
        <Timeago date={time} />
      </div>
    </div>
  );
};
export default Message;
