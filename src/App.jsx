import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack"; // Import SnackbarProvider
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import DeleteActivities from "./pages/DeleteActivities.jsx";
import "./App.css";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/activities/delete/:id" element={<DeleteActivities />} />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
