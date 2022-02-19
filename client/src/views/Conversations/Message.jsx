import Timeago from "react-timeago";
const Message = (props) => {
  const { message_text, created_at, sender_id, userID } = props;
  const align = () => {
    if (userID == sender_id) {
      // return "self-end bg-chat-100 rounded-br-none";
      return "self-end bg-primary rounded-br-none";
    } else {
      // return "self-start bg-chat-200 rounded-bl-none";
      return "self-start bg-secondary rounded-bl-none";
    }
  };

  return (
    <div className="flex flex-col bg-base-100">
      <div
        style={{ color: "#1B3D2F" }}
        className={`p-3 mx-5 mt-6 border border-black mb-1 rounded-lg max-w-[65%] text-left break-words ${align()}`}
      >
        {message_text}
      </div>
      <div className="text-xs">
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
