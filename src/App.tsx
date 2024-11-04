import React from "react";
import "./App.css";
import "./App.css";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <NavbarComponent></NavbarComponent>
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <FooterComponent />
    </Box>
  );
}

export default App;
