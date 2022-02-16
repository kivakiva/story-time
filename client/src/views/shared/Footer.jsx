import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  // const signedIn = localStorage.getItem("userID")
  const { loggedIn, setLoggedIn } = props;

  return (
    <nav className="footer bg-base-100 gap-2">
      <Link to="/">
        <i className="fa-solid fa-house footer-icon"></i>
      </Link>
      {loggedIn ? (
        <Link to="/myreads">
          <i className="fa-solid fa-book-open footer-icon"></i>
        </Link>
      ) : (
        <i className="fa-solid fa-book-open footer-icon text-base-100"></i>
      )}
      {loggedIn ? (
        <Link to="/conversations">
          <i className="fa-solid fa-comment footer-icon"></i>
        </Link>
      ) : (
        <i className="fa-solid fa-comment footer-icon text-base-100"></i>
      )}
      <Link to="/profile">
        <i className="fa-solid fa-user footer-icon"></i>
      </Link>
    </nav>
  );
}

export default Footer;
