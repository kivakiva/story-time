import capitalize from "../helpers/capitalize";
import renderRating from "../helpers/renderRating";
import { Link } from "react-router-dom";
import CardListenRequest from "../shared/Cards/CardListenRequest";
import { useEffect, useState } from "react";
import axios from "axios";

const Listen = (props) => {
  const { title, reader, status, id } = props;
  const [request, setRequest] = useState({});
  // useEffect(() => {
  //   axios.get("").then((res) => {
  //     console.log(res.response);
  //   });
  // });

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
          <div className="flex flex-row mt-3 mb-1">
            {/* {listener.listener_rating && renderRating(listener.listener_rating)} */}
            {renderRating(4)}
          </div>
          {/* <div>Listens: {listener.accepted_listens}</div> */}
          <div className="badge my-2">
            <b>{capitalize("accepted")}</b>
          </div>
        </div>
        <div className="flex items-end flex-col justify-end text-right">
          <div>
            <figure>
              <img
                className="pl-3 py-3"
                src="https://api.lorem.space/image/book?w=80&h=120"
                alt="Book"
              />
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
