import Timeago from "react-timeago";
import { Link } from "react-router-dom";
const ConversationItem = (props) => {
  const { name, lastMessage, avatar, datetimeSent, id } = props;
  return (
    <Link to={`${id}`}>
      <div className="container bg-base-300 rounded-box flex flex-row justify-start p-5 space-x-5">
        <div className="avatar">
          <div className="w-14 rounded-full">
            <img alt="" src={avatar} />
          </div>
        </div>
        <div className="flex flex-col justify-center text-left container">
          <div>
            <b>{name}</b>
          </div>
          <div>{lastMessage}</div>
          {/* {name} {lastMessage} */}
        </div>
        <div className="flex justify-self-end">
          <Timeago date={datetimeSent} />
        </div>
      </div>
    </Link>
  );
};
export default ConversationItem;
