import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import MessageInput from "../Conversations/MessageInput";
import MessageContext from "../../context/messageContext";

function Footer(props) {
  const { chatOpen } = useContext(MessageContext);
  const userID = localStorage.getItem("userID");
  const pathname = useLocation().pathname;

  const greyOutNavIconIfPathDoesNotContain = (locations) => {
    const locationMatchesIconArr = locations.filter((location) =>
      pathname.includes(location)
    );
    return locationMatchesIconArr.length === 0 && "text-base-300";
  };
  const greyOutHomeIfPathIsNotHome = () => {
    if (pathname !== "/") {
      return "text-base-300";
    }
  };

  return (
    <nav className="footer fixed flex items-center justify-around border-main-100 border-t bottom-0 bg-base-100 gap-2 h-20">
      {chatOpen ? (
        <MessageInput />
      ) : (
        <>
          <Link to="/">
            <i
              className={`fa-solid fa-house footer-icon ${greyOutHomeIfPathIsNotHome()}`}
            ></i>
          </Link>
          {userID ? (
            <Link to="/myreads">
              <i
                className={`fa-solid fa-book-open footer-icon ${greyOutNavIconIfPathDoesNotContain(
                  ["myreads", "listen"]
                )}`}
              ></i>
            </Link>
          ) : (
            <i className="fa-solid fa-book-open footer-icon text-base-100"></i>
          )}
          {userID ? (
            <Link to="/conversations">
              <i
                className={`fa-solid fa-comment footer-icon ${greyOutNavIconIfPathDoesNotContain(
                  ["conversations"]
                )}`}
              ></i>
            </Link>
          ) : (
            <i className="fa-solid fa-comment footer-icon text-base-100 "></i>
          )}
          <Link to="/profile">
            <i
              className={`fa-solid fa-user footer-icon ${greyOutNavIconIfPathDoesNotContain(
                ["profile", "login"]
              )}`}
            ></i>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Footer;
