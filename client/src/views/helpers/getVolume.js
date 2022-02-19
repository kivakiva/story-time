import axios from "axios";
const getVolume = (title) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => {
      const baseKey = res.data.items[0];
      const id = baseKey.id;
      let thumbnail = baseKey.volumeInfo.imageLinks.thumbnail;
      if (!thumbnail) {
        thumbnail =
          "https://code-artisan.io/wp-content/uploads/2020/12/default_book_cover_2015.jpg";
      }
      const title = baseKey.volumeInfo.title;
      const author = baseKey.volumeInfo.authors[0];
      const maturityRating = baseKey.volumeInfo.categories.maturityRating;
      let language = baseKey.volumeInfo.language;
      if (!language) {
        language = "en";
      }

      return {
        cover: thumbnail,
        title: title,
        author: author,
        id: id,
        maturityRating: maturityRating,
        language: language,
      };
    });
};
export default getVolume;
