import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  const { loggedIn, setLoggedIn, navLoc, setNavLoc } = props;

  const navColorController = (location) => {
    return location !== navLoc && "text-base-300";
  };

  return (
    <nav className="footer bg-base-100 gap-2">
      <Link to="/">
        <i
          className={`fa-solid fa-house footer-icon ${navColorController(
            "home"
          )}`}
          onClick={() => setNavLoc("home")}
        ></i>
      </Link>
      {loggedIn ? (
        <Link to="/myreads">
          <i
            className={`fa-solid fa-book-open footer-icon ${navColorController(
              "myreads"
            )}`}
            onClick={() => setNavLoc("myreads")}
          ></i>
        </Link>
      ) : (
        <i className="fa-solid fa-book-open footer-icon text-base-100"></i>
      )}
      {loggedIn ? (
        <Link to="/conversations">
          <i
            className={`fa-solid fa-comment footer-icon ${navColorController(
              "conversations"
            )}`}
            onClick={() => setNavLoc("conversations")}
          ></i>
        </Link>
      ) : (
        <i className="fa-solid fa-comment footer-icon text-base-100 "></i>
      )}
      <Link to="/profile">
        <i
          className={`fa-solid fa-user footer-icon ${navColorController(
            "profile"
          )}`}
          onClick={() => setNavLoc("profile")}
        ></i>
      </Link>
    </nav>
  );
}

export default Footer;
