import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import FooterComponent from "./components/FooterComponent";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <FooterComponent />
    </Box>
  );
}

export default App;
