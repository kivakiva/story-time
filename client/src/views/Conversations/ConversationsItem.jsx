import Timeago from "react-timeago";
import { Link } from "react-router-dom";
const ConversationItem = (props) => {
  const { name, message_text, image_url, created_at, convoID } = props;

  return (
    <Link to={`${convoID}`} className="flex flex-col items-center w-full">
      <div class="card w-100 bg-base-100 shadow-xl border flex flex-row items-center p-4 m-1 w-11/12">
        <div className="avatar">
          <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-2">
            <img alt="" src={image_url} />
          </div>
        </div>
        <div className="flex flex-col self-start text-left container">
          <div>
            <b>{name}</b>
          </div>
          <div className="break-words">
            {message_text.length < 35
              ? message_text
              : `${message_text.substring(0, 35)}...`}
          </div>
        </div>
        <div className="flex justify-self-end text-sm">
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
