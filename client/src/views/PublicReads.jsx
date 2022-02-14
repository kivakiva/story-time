import Read from "./myreads/Read";
import { Link } from "react-router-dom";

const PublicReads = (props) => {
  const userID = localStorage.getItem("userID");
  const testReads = [
    {
      id: 1,
      title: "moby dick",
      listener: "donny phan",
      status: "pending",
      listener_img_url: "https://avatars.githubusercontent.com/u/74743983?v=4",
    },
    {
      id: 2,
      title: "harry potter",
      listener: "ruta reiso",
      status: "pending",
      listener_img_url: "https://avatars.githubusercontent.com/u/73975409?v=4",
    },
    {
      id: 3,
      title: "the very hungry caterpillar",
      listener: "adrian kiva",
      status: "pending",
      listener_img_url:
        "https://i.cbc.ca/1.4684305.1527704601!/fileImage/httpImage/image.png_gen/derivatives/original_1180/adrian-kiva.png",
    },
  ];

  const parsedReads = testReads.map((read) => {
    return <Read key={read.id} {...read} />;
  });

  const loggedIn = false;

  return (
    <div>
      {!userID && (
        <div>
          Welcome! Here at Story Time we connect readers and listeners together.
          If you want to read to someone, check out the requests below! :
        </div>
      )}
      {userID && <div>Logged in as user:{userID}</div>}
      <div>
        <i className="fa-solid fa-microphone"></i> Reading Requests
      </div>
      {parsedReads}
      <Link to="/listen/create">Make your own reading request</Link>
    </div>
  );
};
export default PublicReads;
