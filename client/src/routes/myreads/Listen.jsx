import { useNavigate } from "react-router-dom";

const Listen = (props) => {

  const { title, reader, status, id } = props;

  const navigate = useNavigate()

  return (
    <div
      onClick={()=>navigate(`/listen/${id}`)}
    >
      { title } | { reader } | status: {status }
      <br/>
    </div>
  )

}
export default Listen