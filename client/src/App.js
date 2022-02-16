import { Link, Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import "./App.css";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Outlet context={{ loggedIn, setLoggedIn }} />
      </main>
      <Footer {...{ loggedIn, setLoggedIn }}></Footer>
    </div>
  );
}

export default App;
