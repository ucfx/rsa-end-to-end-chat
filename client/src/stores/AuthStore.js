import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
