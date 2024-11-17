import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/FooterComponent";
import { Box } from "@mui/material";
import { SnackbarProvider } from "./context";

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <main className="main-content">
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </main>
      <Footer />
    </Box>
  );
}

export default App;
