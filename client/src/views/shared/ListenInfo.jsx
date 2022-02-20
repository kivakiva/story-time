import React, { useEffect, useState } from "react";
import getVolume from "../helpers/getVolume";
import AcceptedRequestMessages from "./AcceptedRequestMessages";
import Book from "./Book";
import StatusBadge from "./StatusBadge";

const ListenInfo = ({
  listen,
  actionLine,
  totalOffers,
  status,
  whoCancelled,
  offer,
}) => {
  const [volume, setVolume] = useState({});

  useEffect(() => {
    console.log("GOOGLE BOOKS CALL");
    if (listen.book_title) {
      getVolume(listen.book_title).then((volume) => setVolume(volume));
    }
  }, [listen.book_title]);

  return (
    <div>
      {/* Action line styled to blend in with user card */}
      <p className=" text-sm font-semibold text-left bg-base-300 uppercase pb-4 px-10">
        {actionLine}
      </p>

      <div className="flex flex-col items-start p-8">
        <Book
          title={listen.book_title}
          author={volume.author}
          cover={volume.cover}
        />

        {
          // Show listener's request message if the read request is in pending state
          !offer && (
            <p className="text-left text-lg leading-5">{listen.request_text}</p>
          )
        }

        {
          // If the offer has been accepted, show Listener's and Reader's messages
          offer && (
            <AcceptedRequestMessages
              offer={offer.offer_text}
              request={listen.request_text}
            />
          )
        }

        {
          // Show total offers if there is at least one
          totalOffers > 0 && (
            <p className="font-semibold text-sm">Total offers: {totalOffers}</p>
          )
        }
        <StatusBadge status={status} whoCancelled={whoCancelled} />
      </div>
    </div>
  );
};

export default ListenInfo;
