import React from "react";
import "./App.css";
import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboardComp/SuperAdminDashboard";
import "./App.css";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import NavbarComponent from "./components/NavbarComponent";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/FooterComponent/components/Footer";

function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
