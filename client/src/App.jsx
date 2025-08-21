import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import CalculatorPage from "./pages/CalculatorPage";
import NewsPage from "./pages/NewsPage";
import ShopPage from "./pages/ShopPage";
import LivePage from "./pages/LivePage";
import EcocenterPage from "./pages/EcocenterPage";
import CarpoolPage from "./pages/CarpoolPage";
import ChatbotPage from "./pages/ChatbotPage";
import DashboardPage from "./pages/DashboardPage";

// Layout
import Layout from "./components/Layout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const navigate = useNavigate();

  // Redirect root "/" -> "/home" if logged in
  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // Login handler
  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/home");
  };
  
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Routes>
      {/* Auth route */}
      <Route path="/" element={<AuthPage onLogin={handleLogin} />} />

      {/* Protected routes */}
      {isLoggedIn ? (
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route path="home" element={<HomePage />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="live" element={<LivePage />} />
          <Route path="ecocenter" element={<EcocenterPage />} />
          <Route path="carpool" element={<CarpoolPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Catch-all inside logged in */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
}

export default App;
