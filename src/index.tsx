import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./components/materialUI/theme";
import { ThemeProvider } from "@mui/material";
import childRoutes from "./routes/Routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: childRoutes,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
