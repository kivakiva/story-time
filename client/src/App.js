import { Outlet } from "react-router-dom";
import Header from "./views/shared/Header";
import Footer from "./views/shared/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="mb-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
