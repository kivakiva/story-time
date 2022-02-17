import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./shared/Error";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    axios({
      method: "post",
      url: `users/login`,
      headers: {},
      data: {
        email: email,
        password: password,
      },
    })
      .then((user) => {
        setError("");
        localStorage.setItem('userID', user.data.cookies.userID)
        console.log("login SUCCESSFUL!");
        navigate("/");
      })
      .catch((err) => {
        setError("Log in failed");
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col pad-4 items-center justify-center mt-24">
      <i className="fa-solid fa-book-open-reader text-9xl m-12"></i>
      <div className="form-control m-4">
        <label className="input-group">
          <span>Email</span>
          <input
            type="text"
            className="input input-bordered"
            value={email}
            onChange={emailChangeHandler}
          />
        </label>
      </div>
      <div className="form-control m-4">
        <label className="input-group">
          <span>Password</span>
          <input
            type="password"
            className="input input-bordered"
            value={password}
            onChange={passwordChangeHandler}
          />
        </label>
      </div>
      {error && <Error error={error}></Error>}
      <button onClick={login} className="btn btn-outline m-4">
        Login
      </button>
      <button className="btn btn-outline m-4">Create New Account</button>
    </div>
  );
};

export default Login;
