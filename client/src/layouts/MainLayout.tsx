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
import Categories from "../pages/Categories";

const MainLayout: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [notification, setNotification] = useState("");

  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Load login status from localStorage
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) setLoggedIn(true);
  }, []);

  // Handle login
  const handleLogin = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
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
        if (data.error === "User not found") {
          setShowRegister(true);
        }
      }
    } catch (err) {
      console.error(err);
      setNotification("Server error. Try again later.");
    }
  };

  // Handle registration
  const handleRegister = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
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
      console.error(err);
      setNotification("Server error. Try again later.");
    }
  };

  // Logout
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
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 w-full md:w-4/5">
            <Header handleLogout={handleLogout} />

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
