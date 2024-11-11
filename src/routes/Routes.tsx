import React from "react";
import { Navigate } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import { LoginForm } from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import SuperAdminLandingPage from "../pages/SuperAdminPage/SuperAdminLandingPage";
import { LandingPageAdminDashboard } from "../pages/LandingPageAdminDashboard";
import { PageNotFound } from "../components/PageNotFound";
import { AddOrganizationForm } from "../pages/AddOrganizationPage";
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
      <ProtectedRoute requiredRole={SUPERADMIN_ROLE_ID}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "adminDashboard",
    element: (
      <ProtectedRoute requiredRole={ADMIN_ROLE_ID}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "supAdmin",
    element: (
      <ProtectedRoute requiredRole={SUPERADMIN_ROLE_ID}>
        <SuperAdminLandingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "AddOrganization",
    element: <AddOrganizationForm />,
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
  {
    path: "**",
    element: <PageNotFound />,
  },
  { path: "approved-retailers", element: <LandingPageAdminDashboard /> },
  {
    path: "",
    element: <Navigate to="login" />,
  },
];

export default childRoutes;
