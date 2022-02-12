import { Link, Outlet } from "react-router-dom";

const MyReads = (props) => {
  return (
    <main>
      <p>MyReads</p> 
      <Link to="./listens">Listening</Link> |
      <Link to="./reads">Reading</Link>
      <Outlet />
    </main>
  )
}
export default MyReads