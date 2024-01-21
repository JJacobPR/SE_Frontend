import "./websocket.js";

import React from "react";
import ReactDOM from "react-dom/client";
import NpcView from "./views/NpcView.jsx";
import HomeView from "./views/HomeView.jsx";
import HubView from "./views/HubView.jsx";
import AccountView from "./views/AccountView.jsx";
import LoginView from "./views/LoginView.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import RegisterView from "./views/RegisterView.jsx";
import ForumView from "./views/ForumView.jsx";
import axios from "axios";

axios.defaults.baseURL = " https://se-test-server.it-core.fun/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

// Example how to use (works with current version of the server)
window.channel = Echo.channel("my-channel");

var channel = Echo.channel("my-channel");

channel.subscribed(function (data) {
  console.info("Websockets are working!");
});

channel.listen(".my-event", function (data) {
  alert(JSON.stringify(data));
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    children: [
      {
        path: "",
        element: <HubView />,
      },
      {
        path: "forum",
        element: <ForumView />,
      },
      {
        path: "account",
        element: <AccountView />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
      {
        path: "npc",
        element: <NpcView />,
      },
      {
        path: "*",
        element: <HubView />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
