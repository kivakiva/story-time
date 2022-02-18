import axios from "axios";
const getCover = (title) => {
  let url = "";
  url = axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => {
      return res.data.items[0].volumeInfo.imageLinks.thumbnail;
    })
    .catch((err) => {
      console.log("getCover error");
      console.log(err);
    });
  if (url) {
    return url;
  }
};
export default getCover;
