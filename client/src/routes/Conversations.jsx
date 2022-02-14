import axios from "axios";

const Conversations = (props) => {
  // const conversations = [];
  axios
    .get("./users/")
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
    });

  return <p>Conversations</p>;
};
export default Conversations;
