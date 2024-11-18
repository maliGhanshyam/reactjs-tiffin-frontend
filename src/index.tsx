import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import childRoutes from "./routes/Routes";
import { Provider } from "react-redux";
import Store from "./store/Store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Theme from "./components/materialUI/Theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: childRoutes,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
