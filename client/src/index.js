import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Listens from "./routes/Listens";
import Reads from "./routes/Reads";
import Conversations from "./routes/Conversations";
import Conversation from "./routes/Conversation";
import Profile from "./routes/Profile";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="listens" element={<Listens />} />
          <Route path="reads" element={<Reads />} />
          <Route path="conversations" element={<Conversations />} />
          <Route path="conversations/:conversation_id" element={<Conversation />} />
          <Route path="profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
