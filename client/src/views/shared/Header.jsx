import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../context/messageContext";
import displayNotification from "../helpers/displayNotification";

function Header() {
  const navigate = useNavigate();
  const { chatOpen } = useContext(MessageContext);

  return (
    <Fragment>
      <div className="header z-10 bg-gradient-to-b from-base-100 via-base-100 to-transparent">
        <div className="relative">
          {chatOpen && (
            <button
              className="absolute left-5 h-full"
              onClick={() => navigate(-1)}
            >
              <i className="fa-solid fa-angle-left fa-2xl"></i>
            </button>
          )}
          <h1 onClick={() => displayNotification("test")} className="app-name">
            StoryTime
          </h1>
        </div>
      </div>
      <div className="app-name">
        <br />
      </div>
    </Fragment>
  );
}

export default Header;
