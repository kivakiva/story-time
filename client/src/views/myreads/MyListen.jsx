import capitalize from "../helpers/capitalize";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";

const Listen = (request) => {
  console.log(request);
  const [cover, setCover] = useState("");

  const { id, title, reader_id } = request;

  useEffect(() => {
    if (title) {
      getVolume(title).then((book) => {
        setCover(book.cover);
      });
    }
  }, [title]);
  return (
    <Link className="grow max-w-md " to={`/listen/${id}`}>
      <div className="click-shadow card border-solid border-stone-400 border card-side bg-base-300 m-2 my-3 p-3 shadow-xl justify-between">
        <div className="flex flex-col mr-2 items-start items-center">
          {/* <div>{conditionalReadingMessage(state)}</div> */}
          <div>state</div>
          <p className="pb-2 text-lg mb-2 font-semibold ">Reader Name</p>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://api.lorem.space/image/face?hash=3174"
                alt="listener"
              />
            </div>
          </div>
          <div className="badge my-2">
            <b>{capitalize("accepted")}</b>
          </div>
        </div>
        <div className="flex items-end flex-col justify-end text-right">
          <div>
            <figure>
              <img className="pl-3 py-3" src={cover} alt="Book" />
            </figure>
            {/* <div>{request.book_title} </div> */}
          </div>
          <div>cancel button</div>
        </div>
      </div>
    </Link>
  );
};
export default Listen;
