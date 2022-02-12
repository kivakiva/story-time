import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <nav className="footer">
      <Link to="/">
        <i className="fa-solid fa-house footer-icon"></i>
      </Link>
      <Link to="/myreads">
        <i className="fa-solid fa-book-open footer-icon"></i>
      </Link>
      <Link to="/conversations">
        <i class="fa-solid fa-comment footer-icon"></i>
      </Link>
      <Link to="/profile">
        <i className="fa-solid fa-user footer-icon"></i>
      </Link>
    </nav>
  );
}

export default Footer;
