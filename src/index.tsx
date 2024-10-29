import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './components/NotFound';
import AdminRegistrationPage from './pages/AdminRegistrationPage';

let childRoutes = [
  {
    path: 'register',
    element: <AdminRegistrationPage />
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
    <RouterProvider router={router}></RouterProvider>
    {/* <App /> */}
  </React.StrictMode>
);
reportWebVitals();
