import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/organisms/Header";
import { useCartStore } from "../store/useCartStore";

export default function MainLayout() {
  const navigate = useNavigate();

  const cartCount = useCartStore((s) =>
    s.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleNavigate = (page) => navigate(page);

  return (
    <div className="min-h-screen flex flex-col">

      <Header
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
