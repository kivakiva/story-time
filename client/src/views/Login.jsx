import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./shared/Error";
import { ImArrowRight } from "react-icons/im";
import GuestLogin from "./GuestLogin";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState(false);
  const userID = localStorage.getItem("userID");

  const navigate = useNavigate();

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    axios({
      method: "post",
      url: `/api/users/login`,
      headers: {},
      data: {
        email,
        password,
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

  const register = () => {
    axios({
      method: "post",
      url: `/api/users/signup`,
      headers: {},
      data: {
        name,
        email,
        password,
      },
    })
      .then((user) => {
        console.log(user);
        setError("");
        localStorage.setItem("userID", user.data.user.id);
        console.log("registration SUCCESSFUL!");
        navigate("/");
      })
      .catch((err) => {
        setError("Registration in failed");
        console.log(err.message);
      });
  };

  const toggleRegistration = () => {
    setError(false);
    setRegistering((prev) => !prev);
  };

  const formSubmitHandler = () => {
    if (registering) {
      register();
    } else {
      login();
    }
  };

  useEffect(() => {
    if (userID) {
      navigate("/profile");
    }
  }, [userID, navigate]);

  return (
    <div className="flex flex-col pad-4 items-center justify-center mt-12">
      <label
        htmlFor="guest-login-modal"
        className="btn btn-secondary modal-button m-1 mb-6"
      >
        Guest Login
      </label>
      <GuestLogin setError={setError} />
      <i className="fa-solid fa-book-open-reader text-9xl m-12"></i>

      {registering && (
        <div className="form-control m-2">
          <label className="input-group">
            <span className="w-24">Name</span>
            <input
              required
              type="text"
              className="input input-bordered"
              value={name}
              onChange={nameChangeHandler}
              autoFocus
            />
          </label>
        </div>
      )}

      <div className="form-control m-2">
        <label className="input-group">
          <span className="w-24">Email</span>
          <input
            required
            type="email"
            className="input input-bordered"
            value={email}
            onChange={emailChangeHandler}
            autoFocus
          />
        </label>
      </div>

      <div className="form-control m-2">
        <label className="input-group">
          <span className="w-24">Password</span>
          <input
            required
            type="password"
            className="input input-bordered"
            value={password}
            onChange={passwordChangeHandler}
          />
        </label>
      </div>
      {error && <Error error={error}></Error>}
      <button
        onClick={formSubmitHandler}
        className="btn btn-outline m-4 text-lg"
      >
        {registering ? "Register" : "Login"}
      </button>
      <button
        onClick={() => toggleRegistration(true)}
        className="btn btn-outline m-4"
      >
        {registering ? "Go to login" : "Create New Account"}{" "}
        <ImArrowRight className="ml-2"></ImArrowRight>
      </button>
    </div>
  );
};

export default Login;
