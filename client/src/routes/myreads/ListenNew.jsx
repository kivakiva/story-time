import { useNavigate } from "react-router-dom";

const ListenNew = (props) => {

 //if not logged in redirect to login
 const loggedIn = true;

const navigate = useNavigate()

 if (!loggedIn) {
   navigate("/login")
 }
  return (
    <form action="" method="get">
      <input type="text" placeholder="Book Title" name="title"/>
      <input type="text" placeholder="Author" name="author"/>
      <input type="text" placeholder="optional: my request message listener" name="message"/>
      <input type="submit" value="Add request" />
    </form>
    )
};
export default ListenNew;
