import React from 'react';
import './App.css';
import AdminRegistrationPage from './pages/AdminRegistrationPage';
import NavbarComponent from './components/NavbarComponent';
import { Outlet } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <Outlet></Outlet>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
