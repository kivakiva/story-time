import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import MyReads from "./routes/MyReads";
import PublicReads from "./routes/PublicReads";
import Conversations from "./routes/Conversations";
import Conversation from "./routes/Conversation";
import Profile from "./routes/Profile";
import ReadExpand from "./routes/myreads/ReadExpand";
import ListenExpand from "./routes/myreads/ListenExpand";
import Test from "./Components/Test";
import ListenNew from "./routes/myreads/ListenNew";

ReactDOM.render(
  <React.StrictMode>
    <Test></Test>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PublicReads />} />
          <Route path="myreads" element={<MyReads />} />
          <Route path="conversations" element={<Conversations />} />
          <Route
            path="conversations/:conversation_id"
            element={<Conversation />}
          />
          <Route path="profile" element={<Profile />} />
          <Route path="listen/create" element={<ListenNew />} />
          <Route path="read/:readId" element={<ReadExpand />} />
          <Route path="listen/:listenId" element={<ListenExpand />} />
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
