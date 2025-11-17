import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) =>
  {
    set((state) => {
      const exists = state.cart.find((p) => p.id === product.id);
      if (exists) {
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    })},

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((p) =>
        p.id === id ? { ...p, quantity } : p
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  getCartTotal: () => {
    const cart = get().cart;   // <-- Correct way to access state inside store
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
