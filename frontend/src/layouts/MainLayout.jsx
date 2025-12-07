import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header";
import { useCartStore } from "../store/useCartStore";
import React from "react";
import { useUserStore } from "../store/useUserStore";

export default function MainLayout() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState("home");
  const cartCount = useCartStore((state) => state.cart.length);

  const handleNavigate = (page) => {
    navigate(page);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        cartCount={cartCount}
        onNavigate={handleNavigate}
      />

      {/* Render child pages here */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
