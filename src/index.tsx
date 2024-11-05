import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard';
import LoginPage from './pages/LoginPage';
import theme from './components/materialUI/theme';
import { ThemeProvider } from '@mui/material';
import AddOrganisationForm from './components/Forms';

const childRoutes = [
  {
    path: 'register',
    element: <AdminRegistrationPage />
  },
  {
    path: "**",
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
    path: "addOrganization",
    element: <AddOrganisationForm />,
  },
];
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
