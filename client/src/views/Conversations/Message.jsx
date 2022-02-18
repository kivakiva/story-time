import Timeago from "react-timeago";
const Message = (props) => {
  const { message_text, created_at, sender_id, userID } = props;
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
        <Timeago
          // formatter shows 'just now' instead of counting seconds
          formatter={(value, unit, suffix) => {
            if (unit === "second") {
              return "just now";
            } else {
              return value + " " + unit + (value > 1 ? "s" : "") + " " + suffix;
            }
          }}
          date={created_at}
        />
      </div>
    </div>
  );
};
export default Message;
