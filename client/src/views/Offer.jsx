import axios from "axios";
import { useEffect, useState } from "react";
import Timeago from "react-timeago";

const Offer = (props) => {
  console.log("props :>> ", props);
  const { id, request_id, reader_id, offer_text, state } = props.offer;
  console.log("reader_id :>> ", reader_id);
  const [reader, setReader] = useState({});

  useEffect(() => {
    const fetchReader = async () => {
      try {
        const res = await axios.get(`/users/${reader_id}`);
        setReader(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReader();
  }, [reader_id]);

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
