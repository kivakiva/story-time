import { Link, Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("userID"));
  const [navLoc, setNavLoc] = useState();
  const [isMessaging, setIsMessaging] = useState(false);
  return (
    <div className="App">
      <Header></Header>
      <main className="mb-20">
        <Outlet
          context={{
            loggedIn,
            setLoggedIn,
            navLoc,
            setNavLoc,
            isMessaging,
            setIsMessaging,
          }}
        />
      </main>
      <Footer
        {...{ loggedIn, setLoggedIn, navLoc, setNavLoc, isMessaging }}
      ></Footer>
    </div>
  );
}

export default App;
