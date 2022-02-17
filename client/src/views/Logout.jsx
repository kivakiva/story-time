import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useOutletContext } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = useOutletContext();

  useEffect(() => {
    axios
      .post(`../users/logout`)
      .then((res) => {
        localStorage.removeItem("userID");
        setLoggedIn(false)
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [navigate]);

  return <div>Logout</div>;
};

export default Logout;
