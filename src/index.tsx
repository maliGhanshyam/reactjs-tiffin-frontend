import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import LoginPage from "./pages/LoginPage";
import Theme from "./components/materialUI/Theme";
import { ThemeProvider } from "@mui/material";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import { Provider } from "react-redux";
import Store from "./store/Store";
import AuthGuard from "./components/RouteGuard/AuthGuard";
import { SUPERADMIN_ROLE_ID, ADMIN_ROLE_ID } from "./constants/ROLES";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
const childRoutes = [
  {
    path: "register",
    element: <AdminRegistrationPage />,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "superadmin",
    element: (
      <AuthGuard requiredRole={SUPERADMIN_ROLE_ID}>
        <SuperAdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "admin",
    element: (
      <AuthGuard requiredRole={ADMIN_ROLE_ID}>
        <AdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
  {
    path: "**",
    element: <NotFound></NotFound>,
  },
];
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
    <Provider store={Store}>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={router} />
        {/* <App /> */}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
