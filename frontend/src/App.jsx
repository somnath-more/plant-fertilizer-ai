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




export default function App() {
  const navigate=useNavigate();
  const handleLogin=(data)=>{
    console.log(data);
    navigate("/home");
  }
  return (
<Routes>

  {/* Layout Route */}
  <Route element={<MainLayout />}>

    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/chatbot" element={<ChatbotPage />} />
    <Route path="/ai-diagnosis" element={<AIDiagnosisPage />} />

  </Route>

  {/* Routes WITHOUT layout */}
  <Route path="/login" element={<LoginPage onLogin={(data) => {handleLogin(data)}} onSignUp={() => {navigate("/register")}} />} />
  <Route path="/register" element={<SignupPage onRegister={(data) => {handleLogin(data)}} onLogin={() => {navigate("/login")}} />} />
  <Route path="*" element={<div>404 Not Found</div>} />

</Routes>
  );
}
