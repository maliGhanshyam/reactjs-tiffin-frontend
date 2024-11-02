import React from "react";
import "./App.css";
import "./App.css";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      <main style={{ minHeight: "calc(100vh - 182px)" }}>
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;
