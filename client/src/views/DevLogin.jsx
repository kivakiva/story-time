import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate, useOutletContext } from "react-router-dom";

const DevLogin = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userID = pathname.substring(7);

  const { loggedIn, setLoggedIn } = useOutletContext();

  useEffect(() => {
    axios
      .get(`../users/devlog/${userID}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userID", res.data.cookies.userID);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [userID, navigate]);

  return <div>Login</div>;
};

export default DevLogin;
