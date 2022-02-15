import Timeago from "react-timeago";
const Message = (props) => {
  const { message, datetimeSent, senderId } = props;
  return (
    <div>
      {message}, <Timeago date={datetimeSent} />, {senderId}
    </div>
  );
};
export default Message;
