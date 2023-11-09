import React from "react";
import ReactDOM from "react-dom/client";
import HomeView from "./views/HomeView.jsx";
import HubView from "./views/HubView.jsx";
import AccountView from "./views/AccountView.jsx";
import LoginView from "./views/LoginView.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { Provider } from "react-redux";
import "./index.scss";
import RegisterView from "./views/RegisterView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    children: [
      {
        path: "hub",
        element: <HubView />,
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
        element: <RegisterView/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
