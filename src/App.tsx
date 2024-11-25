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
      <SnackbarProvider>
      <Navbar />
      <main className="main-content">
          <Outlet />
      </main>
      <Footer />
      </SnackbarProvider>
    </Box>
  );
}

export default App;
