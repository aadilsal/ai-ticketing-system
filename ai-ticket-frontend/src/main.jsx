import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes } from "react-router-dom";
import CheckAuth from "./components/check-auth.jsx";
import Tickets from "./pages/tickets.jsx";
import TicketDetailsPage from "./pages/ticket.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <checkAuth protected={true}>
              <Tickets />
            </checkAuth>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <CheckAuth protected={true}>
              <TicketDetailsPage />
            </CheckAuth>
          }
        />
        <Route
          path="/login"
          element={
            <checkAuth protected={false}>
              <Login />
            </checkAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <checkAuth protected={false}>
              <Signup />
            </checkAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <checkAuth protected={true}>
              <Admin />
            </checkAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
