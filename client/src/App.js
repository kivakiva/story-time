import { Link, Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="mb-24">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
