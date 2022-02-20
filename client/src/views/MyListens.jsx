import Listen from "./myreads/MyListen";
import { Link } from "react-router-dom";

const Listens = (props) => {
  const { myListens } = props;
  const parsedListens = myListens.map((listen) => {
    return <Listen key={listen.id} {...listen} />;
  });

  return (
    <div className="m-2 flex items-center justify-evenly bg-base-200 mt-2 border border-x-base-200 flex-wrap">
      <button className="btn btn-active my-6">
        <Link to="../listen/create">Create read request</Link>
      </button>
      {parsedListens}
    </div>
  );
};
export default Listens;
