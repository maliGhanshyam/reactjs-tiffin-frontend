import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/FooterComponent";
import { Box } from "@mui/material";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
}

export default App;
