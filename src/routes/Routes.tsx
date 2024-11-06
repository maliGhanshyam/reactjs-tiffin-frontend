import { Navigate } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import NotFound from "../components/NotFound";
import LoginPage from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";

const childRoutes = [
  {
    path: "register",
    element: <AdminRegistration />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "dashboard",
    element: <SuperAdminDashboard />,
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
    element: <NotFound />,
  },
];

export default childRoutes;
