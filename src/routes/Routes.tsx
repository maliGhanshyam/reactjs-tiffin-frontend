import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { AdminRegistration } from "../pages/AdminRegistration";
import { LoginForm } from "../pages/LoginPage";
import SuperAdminDashboard from "../pages/dashboard/SuperAdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ADMIN_ROLE_ID, SUPERADMIN_ROLE_ID } from "../constants/ROLES";
import AdminDashboard from "../pages/dashboard/AdminDashboard/AdminDashboard";
import SuperAdminLandingPage from "../pages/SuperAdminPage/SuperAdminLandingPage";
import { LandingPageAdminDashboard } from "../pages/LandingPageAdminDashboard";
import { PageNotFound } from "../components/NotFound";
import { AddOrganizationForm } from "../pages/AddOrganizationPage";
const childRoutes: RouteObject[] = [
  {
    path: "register",
    element: (
      <ProtectedRoute guestOnly={true}>
        <AdminRegistration />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute guestOnly={true}>
        <LoginForm />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute requiredRole={SUPERADMIN_ROLE_ID}>
        <AddOrganizationForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editOrganization/:_id",
    element: (
      <ProtectedRoute requiredRole={SUPERADMIN_ROLE_ID}>
        <AddOrganizationForm />
      </ProtectedRoute>
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
  {
    path: "approved-retailers",
    element: (
      <ProtectedRoute requiredRole={ADMIN_ROLE_ID}>
        <LandingPageAdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "",
    element: <Navigate to="login" />,
  },
];

export default childRoutes;
