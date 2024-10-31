import React from "react";
import "./App.css";
// import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboardComp/SuperAdminDashboard";
import "./App.css";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import LoginPage from "./pages/LoginPage";
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
        <main>
          <Outlet/>
        </main>
      <FooterComponent/>
    </div>
  );
}

export default App;
