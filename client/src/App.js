import { Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import { ReactNotifications } from "react-notifications-component";
import Notification from "./views/shared/Notification";
import "./App.css";

function App() {
  return (
    <div className="App flex flex-col items-center">
      <ReactNotifications />
      <Header />
      <Notification message='TESTING!!!'></Notification>
      <main className="mb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
