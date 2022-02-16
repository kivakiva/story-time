import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import MyReads from "./views/MyReads";
import PublicListens from "./views/PublicListens";
import Conversations from "./views/Conversations";
import ConversationTest from "./views/ConversationTest";
import Conversation from "./views/Conversation";
import Messages from "./views/Messages";
import Profile from "./views/Profile";
import ReadExpand from "./views/myreads/ReadExpand";
import ListenExpand from "./views/myreads/ListenExpand";
import Test from "./views/shared/Test";
import ListenNew from "./views/myreads/ListenNew";
import DevLogin from "./views/DevLogin";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Offers from "./views/Offers";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PublicListens />} />
          <Route path="myreads" element={<MyReads />} />
          <Route path="conversations" element={<Conversations />} />
          {/* <Route path="conversations" element={<ConversationTest />} /> */}
          <Route path="conversations/:conversation_id" element={<Messages />} />
          <Route path="profile" element={<Profile />} />
          <Route path="listen/create" element={<ListenNew />} />
          <Route path="read/:readId" element={<ReadExpand />} />
          <Route path="listen/:listenId" element={<ListenExpand />} />
          <Route path="login/:userId" element={<DevLogin />} />
          <Route path="logout/" element={<Logout />} />
          <Route path="login/" element={<Login />} />
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
    {/* <Test></Test> */}
  </React.StrictMode>,
  document.getElementById("root")
);
