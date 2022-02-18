import axios from "axios";
const getVolume = (title) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => {
      const baseKey = res.data.items[0];
      const id = baseKey.id;
      const thumbnail = baseKey.volumeInfo.imageLinks.thumbnail;
      const title = baseKey.volumeInfo.title;
      const author = baseKey.volumeInfo.authors[0];
      const maturityRating = baseKey.volumeInfo.categories.maturityRating;
      const language = baseKey.volumeInfo.language;

      return {
        cover: thumbnail,
        title: title,
        author: author,
        id: id,
        maturityRating: maturityRating,
        language: language,
      };
    })
    .catch((err) => {
      console.log("getVolume error");
      console.log(err);
    });
};
export default getVolume;
