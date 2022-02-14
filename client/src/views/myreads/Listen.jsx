import { useNavigate } from "react-router-dom";
import CardListenRequest from "../shared/Cards/CardListenRequest";

const Listen = (props) => {
  const { title, reader, status, id } = props;

  const navigate = useNavigate();

  // <div
  //   onClick={()=>navigate(`/listen/${id}`)}
  // >
  //   { title } | { reader } | status: {status }
  //   <br/>
  // </div>
  return <CardListenRequest {...props} />;
};
export default Listen;
