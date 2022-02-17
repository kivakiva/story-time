import React from "react";
import { Link, useLocation } from "react-router-dom";

function Footer(props) {
  const userID = localStorage.getItem("userID");
  const { navLoc, setNavLoc } = props;
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
    <nav className="footer bg-base-100 gap-2">
      <Link to="/">
        <i
          className={`fa-solid fa-house footer-icon ${greyOutHomeIfPathIsNotHome()}`}
          onClick={() => setNavLoc("home")}
        ></i>
      </Link>
      {userID ? (
        <Link to="/myreads">
          <i
            className={`fa-solid fa-book-open footer-icon ${greyOutNavIconIfPathDoesNotContain(
              ["myreads", "listen"]
            )}`}
            onClick={() => setNavLoc("myreads")}
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
            onClick={() => setNavLoc("conversations")}
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
          onClick={() => setNavLoc("profile")}
        ></i>
      </Link>
    </nav>
  );
}

export default Footer;
