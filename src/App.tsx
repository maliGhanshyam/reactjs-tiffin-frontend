import React from "react";
import "./App.css";
// import SuperAdminDashboard from "./pages/SuperAdminDashboard/SuperAdminDashboardComp/SuperAdminDashboard";
import "./App.css";
import AdminRegistrationPage from "./pages/AdminRegistrationPage";
import NavbarComponent from "./components/NavbarComponent";
import { Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/FooterComponent/components/Footer";
import './App.css';

import NavbarComponent from './components/NavbarComponent';
import { Outlet } from 'react-router-dom';
        
import FooterComponent from './components/FooterComponent';
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
