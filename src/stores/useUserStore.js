import { create } from "zustand";
import axios from "../libs/axios";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  // states
  user: null,
  loading: false,
  checkingAuth: true,
  // actions
  signup: async (credentials) => {
    const { name, email, password, confirmPassword } = credentials;
    try {
      set({ loading: true });
      if (password !== confirmPassword) {
        set({ loading: false });
        return toast.error("Passwords do not match");
      }
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  login: async (credentials) => {
    const { email, password } = credentials;
    try {
      set({ loading: true });
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true });
      const res = await axios.get("/auth/profile");
      set({ user: res.data.user });
    } catch (error) {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const res = await axios.post("/auth/logout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },
}));
