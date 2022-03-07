import axios from "axios";
import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router";

const GuestLogin = ({ setError }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios({
      method: "post",
      url: `/api/users/login`,
      headers: {},
      data: {
        email: "user4@example.com",
        password: "password",
      },
    })
      .then((user) => {
        setError("");
        localStorage.setItem("userID", user.data.cookies.userID);
        console.log("login SUCCESSFUL!");
        navigate("/");
      })
      .catch((err) => {
        setError("Log in failed");
        console.log(err.message);
      });
  };

  return (
    <div>
      <input type="checkbox" id="guest-login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Welcome to StoryTime!</h3>
          <p>Try our app as one of the example users!</p>

          <div className="modal-action flex justify-center">
            <label
              onClick={handleSubmit}
              htmlFor="guest-login-modal"
              className="btn btn-outline mx-1"
            >
              Login as Guest
            </label>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline mx-1 px-8"
            >
              <ImCancelCircle className="inline-block mr-2" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;
