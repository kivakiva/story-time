import axios from "axios";
const getCover = (title) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => {
      return res.data.items[0].volumeInfo.imageLinks.thumbnail;
    })
    .catch((err) => {
      console.log("getCover error");
      console.log(err);
    });
};
export default getCover;
