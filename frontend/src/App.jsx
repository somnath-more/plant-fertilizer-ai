import { useState } from "react";
import "./App.css";
import { Header } from "./components/organisms/Header";
import { HomePage } from "./pages/HomePage";
import { PRODUCTDATA } from "./utils";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { BlogPage } from "./pages/BlogPage";
import { LoginPage } from "./pages/LoginPage";
import { CartPage } from "./pages/CartPage";
import { AIDiagnosisPage } from "./pages/AIDiagnosisPage";
import { ChatbotPage } from "./pages/ChatbotPage";
import ShopPage from "./pages/ShopPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products] = useState(PRODUCTDATA);
  const navigate = useNavigate();

  const handleNavigate = (page) => {
    navigate(page);
    setCurrentPage(page);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("home");
    setCurrentPage("home");
  };

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    alert(
      "🎉 Order placed successfully! Thank you for choosing OrganicFert. Your plants will love you!"
    );
    setCart([]);
    navigate("home");
    setCurrentPage("home");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        currentPage={currentPage}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route
          path="/home"
          element={
            <HomePage
              products={products}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          }
        />

        {/* Route for the AI Diagnosis Page */}
        <Route path="/ai-diagnosis" element={<AIDiagnosisPage />} />

        <Route path="/chatbot" element={<ChatbotPage />} />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
              onCheckout={handleCheckout}
            />
          }
        />

        {/* Route for the Blog Page */}
        <Route path="/blog" element={<BlogPage />} />

        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/logout" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="*" element={<div>404 Not Found</div>} />
        {/* shop */}
        <Route
          path="/shop"
          element={
            <ShopPage products={products} onAddToCart={handleAddToCart} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
