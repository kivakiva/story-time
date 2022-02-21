import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import MyReads from "./views/MyReads";
import PublicListens from "./views/PublicListens";
import Conversations from "./views/Conversations/Conversations";
import Conversation from "./views/Conversations/Conversation";
import Profile from "./views/Profile";
import ReadExpand from "./views/myreads/ReadExpand";
import ListenExpand from "./views/myreads/ListenExpand";
import ListenNewOrEdit from "./views/myreads/ListenNewOrEdit";
import DevLogin from "./views/DevLogin";
import Login from "./views/Login";
import Logout from "./views/Logout";

import AllContextProviders from "./context/allContextProviders";
import ScrollToTop from "./views/ScrollToTop";
import EditOffer from "./views/EditOffer";
import Search from "./views/Search/Search";

ReactDOM.render(
  <React.StrictMode>
    <AllContextProviders>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<PublicListens />} />
              <Route path="myreads" element={<MyReads />} />
              <Route path="conversations" element={<Conversations />} />
              <Route
                path="conversations/:conversation_id"
                element={<Conversation />}
              />
              <Route path="profile" element={<Profile />} />
              <Route
                path="listen/create"
                element={<ListenNewOrEdit mode="new" />}
              />
              <Route path="listen/:listenId" element={<ListenExpand />} />
              <Route
                path="listen/:listenId/edit"
                element={<ListenNewOrEdit mode="edit" />}
              />
              <Route path="read/:readId" element={<ReadExpand />} />
              <Route path="read/:readId/edit" element={<EditOffer />} />
              <Route path="login/:userId" element={<DevLogin />} />
              <Route path="logout/" element={<Logout />} />
              <Route path="login/" element={<Login />} />
              <Route path="search" element={<Search />} />
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
        </ScrollToTop>
      </BrowserRouter>
    </AllContextProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
