import { useNavigate } from "react-router-dom";
import CardHomePageReadingRequest from "../shared/Cards/CardHomePageReadingRequest";

const Read = (props) => {
  const { title, listener, status, id } = props;

  const navigate = useNavigate();

  return (
    <CardHomePageReadingRequest
      {...props}
      onClick={() => navigate(`/read/${id}`)}
    ></CardHomePageReadingRequest>
  );
};
export default Read;
