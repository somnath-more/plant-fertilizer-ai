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
import { useAuth0 } from "@auth0/auth0-react";
import { useUserStore } from "./store/useUserStore";

export default function App() {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { success, error } = useAlert();
  const { login } = useUserStore();

  // Manual Login
 const handleLogin = async (formData) => {
  const { apiResponse, message, status } = await loginUser(formData);

  if (!status) {
    error(message);
    return;
  }

  const userObj = {
    name: apiResponse.name,
    email: apiResponse.email,
    roles: apiResponse.roles,
    userId: apiResponse.userId,
    token: apiResponse.token
  };

  localStorage.setItem("token", apiResponse.token);
  localStorage.setItem("user", JSON.stringify(userObj));

  login(userObj);

  success(message);
  navigate("/home");
};


  // Manual Register
  const handleRegister = async (formData) => {
    const { apiResponse, message, status } = await registerUser(formData);

    if (!status) {
      error(message);
      return;
    }

    success(message);
    navigate("/login");
  };

  // Forgot password
  const handleForgotPassword = async (email) => {
    navigate("/verify-otp", { state: { email } });
  };

  // Google/Auth0 login
  const handleGoogleAuthLogin = () => {
    loginWithRedirect();
  };

  return (
    <AppRoutes
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      navigate={navigate}
      handleForgotPassword={handleForgotPassword}
      handleGoogleAuthLogin={handleGoogleAuthLogin}
    />
  );
}
