import React, { useState } from "react";

const ListenContext = React.createContext({
  book_title: undefined,
  setBook_title: () => {},
  bookTitleChangeHandler: () => {},
  request_text: undefined,
  setRequest_text: () => {},
  requestTextChangeHandler: () => {},
  online: undefined,
  setOnline: () => {},
  onlineChangeHandler: () => {},
  in_person: undefined,
  setIn_person: () => {},
  inPersonChangeHandler: () => {},
});

export const ListenProvider = (props) => {
  const [book_title, setBook_title] = useState("");
  const [request_text, setRequest_text] = useState("");
  const [online, setOnline] = useState(false);
  const [in_person, setIn_person] = useState(false);

  const bookTitleChangeHandler = (e) => {
    setBook_title(e.target.value);
  };

  const requestTextChangeHandler = (e) => {
    setRequest_text(e.target.value);
  };

  const inPersonChangeHandler = () => {
    setIn_person((prev) => !prev);
  };

  const onlineChangeHandler = () => {
    setOnline((prev) => !prev);
  };

  return (
    <ListenContext.Provider
      value={{
        book_title,
        setBook_title,
        bookTitleChangeHandler,
        request_text,
        setRequest_text,
        requestTextChangeHandler,
        online,
        setOnline,
        onlineChangeHandler,
        in_person,
        setIn_person,
        inPersonChangeHandler,
      }}
    >
      {props.children}
    </ListenContext.Provider>
  );
};

export default ListenContext;
