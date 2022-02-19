import { Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import { ReactNotifications } from "react-notifications-component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ReactNotifications />
      <Header />
      <main className="mb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
