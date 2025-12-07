import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  login: (userObj) => set({ user: userObj }),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  }
    
}));
