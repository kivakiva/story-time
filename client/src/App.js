import { Link, Outlet } from "react-router-dom";
import React from "react";
import { ReactNotifications } from "react-notifications-component";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userID"));
  const [navLoc, setNavLoc] = useState();

  return (
    <div className="App">
      <ReactNotifications />

      <Header></Header>
      <main className="mb-20">
        <Outlet
          context={{
            loggedIn,
            setLoggedIn,
            navLoc,
            setNavLoc,
          }}
        />
      </main>
      <Footer
        {...{
          loggedIn,
          setLoggedIn,
          navLoc,
          setNavLoc,
        }}
      ></Footer>
    </div>
  );
}

export default App;
