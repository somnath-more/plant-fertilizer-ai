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
import ForgotPassword from "../src/pages/ForgotPassword";
import VerifyOtp from "../src/pages/VerifyOtp/VerifyOtp";

export default function AppRoutes({
  handleLogin,
  handleRegister,
  navigate,
  handleForgotPassword,
  handleGoogleAuthLogin,
}) {
  return (
    <Routes>
      {/* Protected routes with layout */}
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

      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage
              onLogin={handleLogin}
              onSignUp={() => navigate("/register")}
              onForgortPasswordClick={() => navigate("/forgot-password")}
              onGoogleAuthLogin={handleGoogleAuthLogin}
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
              onGoogleAuthLogin={handleGoogleAuthLogin}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword
              onForgotPassword={handleForgotPassword}
              onLogin={() => navigate("/login")}
            />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <PublicRoute>
            <VerifyOtp />
          </PublicRoute>
        }
      />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
