import { Navigate } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import NotFound from "../components/NotFound";
import LoginPage from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AuthGuard from "../components/RouteGuard";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import { ApprovedRetailers } from "../pages/ApprovedRetailers";
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
    path: "superAdminDashboard",
    element: (
      
        <SuperAdminDashboard /> 
      
    ),
  },
  {
    path: "adminDashboard",
    element: (
      
        <AdminDashboard />
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "approved-retailers",
    element: <ApprovedRetailers/>
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
