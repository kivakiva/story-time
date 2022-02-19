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
  return (
    <>
      {/* Action line styled to blend in with user card */}
      <p className=" text-sm font-semibold text-left bg-base-300 uppercase pb-2 px-10">
        {actionLine}
      </p>

      <div className="flex flex-col items-start mb-2 my-4 mx-6">
        <Book title={listen.book_title} />

        {
          // Show listener's request message if the read request is in pending state
          !offer && (
            <p className="text-left py-2 my-1 text-lg leading-5">
              {listen.request_text}
            </p>
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
    </>
  );
};

export default ListenInfo;
