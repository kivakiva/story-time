import { Link } from "react-router-dom";
const Read = (props) => {

  const { title, reader, status, id } = props;

  return (
    <Link to={`/read/${id}`}>
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
    </Link>
  )

}
export default Read