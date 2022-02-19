import Timeago from "react-timeago";
import { Link } from "react-router-dom";
const ConversationItem = (props) => {
  const { name, message_text, image_url, created_at, convoID } = props;
  // console.log(datetimeSent)

  const userID = localStorage.getItem("userID");

  return (
    <Link to={`${convoID}`}>
      <div className="container bg-base-300 rounded-box flex flex-row justify-start p-5 space-x-5">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img alt="" src={image_url} />
          </div>
        </div>
        <div className="flex flex-col justify-center text-left container">
          <div>
            <b>{name}</b>
          </div>
          <div>{message_text}</div>
          {/* {name} {lastMessage} */}
        </div>
        <div className="flex justify-self-end">
          <Timeago
            // formatter shows 'just now' instead of counting seconds
            formatter={(value, unit, suffix) => {
              if (unit === "second") {
                return "just now";
              } else {
                return (
                  value + " " + unit + (value > 1 ? "s" : "") + " " + suffix
                );
              }
            }}
            date={created_at}
          />
        </div>
      </div>
    </Link>
  );
};
export default ConversationItem;
