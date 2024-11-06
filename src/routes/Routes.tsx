import { Navigate } from "react-router-dom";
import AdminRegistration from "../pages/AdminRegistration";
import NotFound from "../components/NotFound";
import LoginPage from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AuthGuard from "../components/RouteGuard";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
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
    element: <NotFound />,
  },
];

export default childRoutes;
