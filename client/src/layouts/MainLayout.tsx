import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Invortry from "../pages/Invortry";
import Addnew from "../pages/Addnew";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const MainLayout: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState("");

  // 🔥 Load login status from localStorage on refresh
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setLoggedIn(true);
  }, []);

  // 🔥 Save login when successful
  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.message === "Login successful!") {
        localStorage.setItem("loggedInUser", username); // SAVE login
        setLoggedIn(true);
        setNotification("");
      } else {
        setNotification(data.error || "Login failed");
      }

      if (data.error === "User not found") {
        setNotification("User not registered! Please register first.");
        setShowRegister(true);
      }
    } catch (err) {
      setNotification("Server error. Try again later.");
    }
  };

  // Register
  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setNotification("Registration successful! Please login now.");
        setShowRegister(false);
      } else {
        setNotification(data.error || "Registration failed");
      }
    } catch (err) {
      setNotification("Server error. Try again later.");
    }
  };

  // Logout → clear localStorage
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {!loggedIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
          {notification && (
            <div className="mb-4 p-3 bg-yellow-200 text-yellow-800 rounded">
              {notification}
            </div>
          )}

          {!showRegister ? (
         
            <LoginForm  onLogin={handleLogin} switchToRegister={() => setShowRegister(true)} />
          ) : (
            <RegisterForm onRegister={handleRegister} switchToLogin={() => setShowRegister(false)} />
          )}
        </div>
      ) : (
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 w-full md:w-4/5">
            <Header handleLogout={handleLogout} />

            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
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
