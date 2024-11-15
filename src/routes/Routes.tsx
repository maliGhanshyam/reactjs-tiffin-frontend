import { Navigate } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import { PageNotFound } from "../components/NotFound";
import { LoginForm } from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AuthGuard from "../components/RouteGuard";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import SuperAdminLandingPage from "../pages/SuperAdminPage/SuperAdminLandingPage";
import { LandingPageAdminDashboard } from "../pages/LandingPageAdminDashboard";

const childRoutes = [
  {
    path: "register",
    element: <AdminRegistration />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "superAdminDashboard",
    element: (
      <AuthGuard requiredRole={SUPERADMIN_ROLE_ID}>
        <SuperAdminDashboard /> 
        </AuthGuard>
    ),
  },
  {
    path: "adminDashboard",
    element: (
      <AuthGuard requiredRole={ADMIN_ROLE_ID}>
        <AdminDashboard />
      </AuthGuard>
    ),
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "approved-retailers",
    element: <LandingPageAdminDashboard/>
  },
  {
    path: "supAdmin",
    element: (
      <AuthGuard requiredRole={SUPERADMIN_ROLE_ID}>
        <SuperAdminLandingPage />
      </AuthGuard>
    ),
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
  {
    path: "**",
    element: <PageNotFound />,
  },
];

export default childRoutes;
