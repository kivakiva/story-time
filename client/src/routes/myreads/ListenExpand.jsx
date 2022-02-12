import { useParams } from "react-router-dom";
import TimeAgo from 'react-timeago'

const Read = (props) => {
  const params = useParams();
  //params.id will be used to query all the info via an axios call to the server

  const dataPlaceholder = [
    {
      title: "moby dick",
      author: "herman melville",
      listener: "donny phan",
      message:
        "I really miss the times I used to fall asleep while my grandmother read to me and would love to experience it again.",
      listenNumber: 3,
      status: "active",
      type: "online",
      date: "Aug 13, 2021"
    },
  ];

  const id = params.listenId;
  const { title, listener, date, listenNumber, type, author, message } =
    dataPlaceholder[0];

  return (<div>
      <div>Your request to listen to</div>
      <div>{ title }</div>
      <div> made 
        <TimeAgo date={date} />
      </div>
    </div>)
};
export default Read;
