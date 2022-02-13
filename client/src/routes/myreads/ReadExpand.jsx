import { Link, useParams } from "react-router-dom";
const Read = (props) => {

  const params = useParams();
  //params.id will be used to query all the info via an axios call to the server

  const dataPlaceholder = [
   { 
      title: "moby dick",
      author: "herman melville",
      listener: "donny phan",
      message: "I really miss the times I used to fall asleep while my grandmother read to me and would love to experience it again.",
      listenNumber: 3,
      status: "active",
      type: "online"
    }
  ]

  const id = params.readId
  const { title, listener, listenNumber, type, author, message } = dataPlaceholder[0];
  console.log("id: ", id);

  return (
    <ul>
      <li>
      Expanded read view for read id: {id}
      </li>
      <li>
    Listener name: { listener }
      </li>
      <li>
    Listens: <span>{listenNumber}</span>
      </li>
      <li>
    Type: {type}
      </li>
      <li>
    would like to listen to: { title }
      </li>
      <li>
    by { author }
      </li>
      <li>
    { message }
      </li>
    <form action="" method="get">
      <input type="text" placeholder="optional: add message to listener"/>
      <input type="submit" value="Offer to read" />
    </form>
    </ul>
  )

}
export default Read