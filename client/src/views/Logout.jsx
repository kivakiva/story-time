import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`/api/users/logout`)
      .then((res) => {
        localStorage.removeItem("userID");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [navigate]);

  return <div>Logout</div>;
};

export default Logout;
