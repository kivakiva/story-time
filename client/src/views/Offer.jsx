import Timeago from "react-timeago";

const Offer = (props) => {
  const { id, request_id, reader_id, offer_text, state } = props;
  //fetch reader info
  return (
    <div style={{ border: "1px solid black" }}>
      {/* <div>{name}</div> */}
      {/* <div>Rating: {rating}</div> */}
      {/* <div>Reads: {reads}</div> */}
      <div>"{offer_text}"</div>
      <button>Accept</button>
      <button>Ignore</button>
      <div>{/* <Timeago date={dateOffered} /> */}</div>
    </div>
  );
};
export default Offer;
