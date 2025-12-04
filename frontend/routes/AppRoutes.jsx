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
import useAlert from "../src/hooks/useAlert";
import { useCartStore } from "../src/store/useCartStore";
import ForgotPassword from "../src/pages/ForgotPassword";
import VerifyOtp from "../src/pages/VerifyOtp/VerifyOtp";

export default function AppRoutes({
  handleLogin,
  handleRegister,
  navigate,
  handleForgotPassword,
}) {
  const { success } = useAlert();
  const clearCart = useCartStore((state) => state.clearCart);
  const handleCheckout = () => {
    success("Checkout successful!");
    // will cleare Cart on Successfull api reponse
    clearCart();
    navigate("/home");
  };
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
        <Route
          path="/cart"
          element={<CartPage onCheckout={handleCheckout} />}
        />
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
                 onForgortPasswordClick={() => navigate("/forgot-password")}
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
              onForgortPasswordClick={() => navigate("/forgot-password")}
              onLogin={() => navigate("/login")}
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
      {/* verify-otp */}
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
