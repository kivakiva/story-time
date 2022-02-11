import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>StoryTime</h1>
      <main>
        <Outlet />
      </main>
      <nav>
        <Link to="/">🏡</Link> | <Link to="/listens">📚</Link> |{" "}
        <Link to="/conversations">💬</Link> | <Link to="/profile">🐼</Link>
      </nav>
    </div>
  );
}

export default App;
