import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../context/messageContext";

function Header() {
  const navigate = useNavigate();
  const { chatOpen } = useContext(MessageContext);
  console.log(chatOpen);

  return (
    <Fragment>
      <div className="header z-10 bg-gradient-to-b from-base-100 via-base-100 to-transparent">
        {chatOpen && (
          <button z-20 onClick={() => navigate(-1)}>
            Back
          </button>
        )}
        <h1 className="app-name">StoryTime</h1>
      </div>
      <div className="app-name">
        <br />
      </div>
    </Fragment>
  );
}

export default Header;
