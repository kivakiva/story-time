import axios from "axios";

const Conversations = (props) => {
  const conversations = [];
  axios.get('./messages/')
  .then(res => 
    console.log(res.data)
    
    )
  .catch(err => console.log(err))
  return <p>Conversations</p>;
};
export default Conversations