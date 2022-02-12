import { useNavigate } from "react-router-dom";

const Listen = (props) => {

  const { title, reader, status, id } = props;

  const navigate = useNavigate()

  return (
    <div
      onClick={()=>navigate(`/listen/${id}`)}
    >
      <span>
      { title } | 
      </span>
      <span>
      { reader } | 
      </span>
      <span>
      status: {status }
      </span>
      <br/>
    </div>
  )

}
export default Listen