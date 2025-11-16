import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  login: (userObj) => set({ user: userObj }),
  logout: () => set({ user: null }),
}));
