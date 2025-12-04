import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

// Pages
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Invortry from "../pages/Invortry";
import Addnew from "../pages/Addnew";
import Categories from "../pages/Categories";

// Auth Components
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const MainLayout: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Use relative path - will be proxied by IIS web.config in production
  // or Vite proxy in development
  const API_BASE = "/api";

  // Load login state
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setLoggedIn(true);
  }, []);

  // 🔐 Login handler
  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("loggedInUser", username);
        setLoggedIn(true);
        setNotification("");
      } else {
        setNotification(data.error || "Login failed");
        if (data.error === "User not found") setShowRegister(true);
      }
    } catch (error) {
      console.error(error);
      setNotification("Server error. Try again later.");
    }
  };

  // 📝 Register handler
  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setNotification("Registration successful! Please login.");
        setShowRegister(false);
      } else {
        setNotification(data.error || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setNotification("Server error. Try again later.");
    }
  };

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {/* ---------- LOGIN & REGISTER SCREEN ---------- */}
      {!loggedIn ? (
        <div
          className="flex flex-col items-center justify-center min-h-screen 
                     bg-gray-200/50 backdrop-blur-sm p-4"
        >
          {/* Notification */}
          {notification && (
            <div className="mb-4 p-3 bg-yellow-200 text-yellow-800 rounded">
              {notification}
            </div>
          )}

          {!showRegister ? (
            <LoginForm
              onLogin={handleLogin}
              switchToRegister={() => setShowRegister(true)}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              switchToLogin={() => setShowRegister(false)}
            />
          )}
        </div>
      ) : (
        /* ---------- MAIN APP LAYOUT ---------- */
        <div
          className="flex min-h-screen bg-gradient-to-br from-gray-200 
                     to-gray-100 backdrop-blur-xl"
        >
          {/* Sidebar */}
          {isSidebarOpen && <Sidebar />}

          {/* Main Content */}
          <main className="flex-1 w-full md:w-4/5 backdrop-blur-sm bg-white/60 shadow-lg">
            {/* Header */}
            <Header
              handleLogout={handleLogout}
              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/invortry" element={<Invortry />} />
              <Route path="/addnew" element={<Addnew />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      )}
    </BrowserRouter>
  );
};

export default MainLayout;
