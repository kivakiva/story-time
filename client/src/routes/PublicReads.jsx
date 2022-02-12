import Read from "./myreads/Read";
import { Link } from "react-router-dom";

const Reads = (props) => {
  const testReads = [
    {
      id: 1,
      title: "moby dick",
      listener: "donny phan",
      status: "pending",
    },
    {
      id: 2,
      title: "harry potter",
      listener: "ruta reiso",
      status: "pending",
    },
    {
      id: 3,
      title: "the very hungry caterpillar",
      listener: "adrian kiva",
      status: "pending",
    },
  ];

  const parsedReads = testReads.map((read) => {
    return <Read key={read.id} {...read} />;
  });

  const loggedIn = false;

  return (
    <div>
      {!loggedIn && <div>Welcome! Here at Story Time we connect readers and listeners together. If you want to read to someone, check out the requests below! :</div> }
      <div>🎙 Reading Requests</div>
      {parsedReads}
      <Link to="/listen/create">Make your own reading request</Link> 
    </div>
  );
};
export default Reads;
