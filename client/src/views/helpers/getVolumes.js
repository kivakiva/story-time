import axios from "axios";
const getVolume = (title) => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
    .then((res) => {
      const volumes = [];
      for (let volume in res.data.items) {
        const baseKey = res.data.items[volume];
        const id = baseKey.id;
        let thumbnail = baseKey.volumeInfo.imageLinks.thumbnail;
        if (!thumbnail) {
          thumbnail =
            "https://code-artisan.io/wp-content/uploads/2020/12/default_book_cover_2015.jpg";
        }
        const title = baseKey.volumeInfo.title;
        const author = baseKey.volumeInfo.authors[0];
        const language = baseKey.volumeInfo.language
          ? baseKey.volumeInfo.language
          : "en";

        const volumeEntry = {
          cover: thumbnail,
          title: title,
          author: author,
          id: id,
          language: language,
        };
        volumes.push(volumeEntry);
      }
      return volumes;
    });
};
export default getVolume;
