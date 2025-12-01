import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import MainLayout from "../src/layouts/MainLayout";
import HomePage from "../src/pages/HomePage";
import ShopPage from "../src/pages/ShopPage";
import CartPage from "../src/pages/CartPage";
import BlogPage from "../src/pages/BlogPage";
import ChatbotPage from "../src/pages/ChatbotPage";
import AIDiagnosisPage from "../src/pages/AIDiagnosisPage";
import LoginPage from "../src/pages/LoginPage";
import SignupPage from "../src/pages/SignupPage";

export default function AppRoutes({ handleLogin, handleRegister, navigate }) {
  return (
    <Routes>
      {/* Protected + Layout Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/ai-diagnosis" element={<AIDiagnosisPage />} />
      </Route>

      {/* Public Routes (Cannot access if logged in) */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage
              onLogin={handleLogin}
              onSignUp={() => navigate("/register")}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignupPage
              onRegister={handleRegister}
              onLogin={() => navigate("/login")}
            />
          </PublicRoute>
        }
      />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
