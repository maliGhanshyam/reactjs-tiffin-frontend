import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import LoginPage from './pages/LoginPage';
import Theme from './components/materialUI/Theme';
import { ThemeProvider } from '@mui/material';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';

const childRoutes = [
  {
    path: 'register',
    element: <AdminRegistrationPage />
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "dashboard",
    element: <SuperAdminDashboard />,
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: '',
    element: <Navigate to="login" />
  },
  {
    path: '**',
    element: <NotFound></NotFound>
  }
]
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: childRoutes
  }
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
