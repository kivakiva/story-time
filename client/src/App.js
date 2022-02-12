import { Link, Outlet } from "react-router-dom";
import Header from './Components/Header'
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
