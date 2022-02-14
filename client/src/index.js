import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import MyReads from "./views/MyReads";
import PublicReads from "./views/PublicReads";
import Conversations from "./views/Conversations";
import Conversation from "./views/Conversation";
import Profile from "./views/Profile";
import ReadExpand from "./views/myreads/ReadExpand";
import ListenExpand from "./views/myreads/ListenExpand";
import Test from "./views/shared/Test";
import ListenNew from "./views/myreads/ListenNew";
import DevLogin from "./views/DevLogin";
import Login from "./views/Login";
import Logout from "./views/Logout";

ReactDOM.render(
  <React.StrictMode>
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
        <Route path="login/:userId" element={<DevLogin />} />
        <Route path="logout/" element={<Logout />} />
        <Route path="login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    <Test></Test>
  </React.StrictMode>,
  document.getElementById("root")
);
