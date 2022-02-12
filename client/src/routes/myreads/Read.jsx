import { useNavigate } from "react-router-dom";
const Read = (props) => {

  const { title, listener, status, id } = props;

  const navigate = useNavigate()

  return (
    <div 
      onClick={()=> navigate(`/read/${id}`)}
      >
      { title } | { listener } | status: {status }
    </div>
  )

}
export default Read