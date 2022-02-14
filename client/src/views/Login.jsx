import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userID = pathname.substring(7);

  useEffect(() => {
    axios
      .get(`../users/devlog/${userID}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userID", res.data.cookies.userID);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
        localStorage.removeItem("userID");
      });
  }, [userID, navigate]);

  return <div>Login</div>;
};

export default Login;
