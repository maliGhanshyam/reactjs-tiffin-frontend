import React from 'react';
import { Navigate } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import { LoginForm } from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import AuthGuard from "../components/RouteGuard";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import SuperAdminLandingPage from "../pages/SuperAdminPage/SuperAdminLandingPage";
import { LandingPageAdminDashboard } from "../pages/LandingPageAdminDashboard";
import { PageNotFound } from "../components/PageNotFound";
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
    element: <PageNotFound />
  },
   { path: "approved-retailers",
    element: <LandingPageAdminDashboard/>
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
];

export default childRoutes;
