import { create } from "zustand";
import { placeOrder as submitOrder } from "../services/api/orderService";

export const useCartStore = create((set, get) => ({
  cart: [],
  placingOrder: false,
  orderError: "",

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

  placeOrder: async ({ userId, shippingAddress, billingAddress, paymentMethod, notes }) => {
    const { cart } = get();
    if (!cart.length) {
      return { status: false, message: "Your cart is empty", data: null };
    }

    const orderRequest = {
      userId,
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      })),
      shippingAddress: shippingAddress.trim(),
      billingAddress: (billingAddress || shippingAddress).trim(),
      paymentMethod,
      notes: notes?.trim() || null,
    };

    set({ placingOrder: true, orderError: "" });
    const response = await submitOrder(orderRequest);
    if (response.status) {
      set({ cart: [], placingOrder: false, orderError: "" });
    } else {
      set({ placingOrder: false, orderError: response.message });
    }
    return response;
  },

  getCartTotal: () => {
    const cart = get().cart;   // <-- Correct way to access state inside store
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));
