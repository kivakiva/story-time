import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Timeago from "react-timeago";
import displayNotification from "./helpers/displayNotification";
import renderRating from "./helpers/renderRating";

const Offer = (props) => {
  const { id, request_id, created_at, reader_id, offer_text } = props.offer;
  const { book_title } = props;
  const listener_id = localStorage.getItem("userID");
  const [reader, setReader] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReader = async () => {
      try {
        const res = await axios.get(`/api/users/${reader_id}`);
        setReader(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReader();
  }, [reader_id]);

  const acceptOffer = async () => {
    try {
      await axios.put(`/api/listens/${request_id}`, {
        action: "ACCEPT",
        request_offer_id: id,
      });
      displayNotification("Offer accepted");
      createMessage();
      navigate("/myreads");
    } catch (err) {
      console.log(err);
    }
  };

  const createMessage = async () => {
    try {
      const listener_res = await axios.get(`/api/users/${listener_id}`);
      const reader_res = await axios.get(`/api/users/${reader_id}`);

      const listener_name = listener_res.data.user.name;
      const reader_name = reader_res.data.user.name;
      const message = `${listener_name} has accepted ${reader_name}'s offer to read`;

      const messageData = {
        sender_id: listener_id,
        recipient_id: reader_id,
        message_text: message,
        customization: {
          mode: "accepted-offer",
          data: { book_title, listener_name, reader_name },
        },
      };

      await axios({
        method: "post",
        url: "/api/messages",
        headers: {},
        data: messageData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl px-6 py-2 my-4 flex flex-row justify-between ">
      <div className="my-1">
        <p className="font-semibold">{reader.name}</p>
        <div className="avatar p-2">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={reader.image_url} alt={reader.name} />
          </div>
        </div>
        <p className="flex justify-center">
          {renderRating(reader.reader_rating)}
        </p>
        <p>
          <span>Reads: </span>
          <span>{reader.accepted_reads}</span>
        </p>
      </div>
      <div className="flex flex-col m-1 mt-3 py-1 pl-2 ml-2 ">
        {offer_text && <p className="text-right">"{offer_text}"</p>}
        {!offer_text && (
          <p className="text-right">
            Reader has made an offer without a message
          </p>
        )}
        <button
          onClick={acceptOffer}
          className="btn btn-sm my-2 btn-secondary border-2 border-solid border-main-100"
        >
          Accept
        </button>
        <Timeago className="text-right" date={created_at} />
      </div>
    </div>
  );
};
export default Offer;
