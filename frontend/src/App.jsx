import { Routes, Route, useNavigate } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import AIDiagnosisPage from "./pages/AIDiagnosisPage";
import ChatbotPage from "./pages/ChatbotPage";
import SignupPage from "./pages/SignupPage";
import { loginUser, registerUser } from "./services/api/authService";
import useAlert from "./hooks/useAlert";
import AppRoutes from "../routes/AppRoutes";

export default function App() {
  const navigate = useNavigate();
  const { success, error } = useAlert();

  // Login Handler
  const handleLogin = async (formData) => {
    const { apiResponse, message, status } = await loginUser(formData);

    if (!status) {
      error(message);
      return;
    }

    // Save token
    localStorage.setItem("token", apiResponse.token);
    localStorage.setItem("user", JSON.stringify(apiResponse.user));

    success(message);
    navigate("/home");
  };

  // Register Handler
  const handleRegister = async (formData) => {
    const { apiResponse, message, status } = await registerUser(formData);

    if (!status) {
      error(message);
      return;
    }

    success(message);
    navigate("/login");
  };
  const handleForgotPassword = async (email) => {
    // const { apiResponse, message, status } = await registerUser(formData);

    // if (!status) {
    //   error(message);
    //   return;
    // }

    // success(message);
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <AppRoutes
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      navigate={navigate}
      handleForgotPassword={handleForgotPassword}
    />
  );
}