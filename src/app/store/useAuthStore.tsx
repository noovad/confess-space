import { create } from "zustand";
import { toast } from "sonner";
import axios from "@/lib/axios";
import { AxiosError } from "axios";

interface AuthState {
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (
    username: string,
    name: string,
    password: string,
    email: string
  ) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true });
    try {
      await axios.post("/login", { username, password });
      toast.success("Login successful!");
      window.location.href = "/";
      return true;
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.message : String(error));
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/auth");

      if (response.data?.data?.url) {
        window.location.href = response.data.data.url;
      }

      return true;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      console.error("Auth error:", err);
      toast.error(err);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (username, name, password, email) => {
    set({ loading: true });

    try {
      await axios.post(`/sign-up?email=${email}`, {
        username,
        name,
        password,
      });
      toast.success("Signup successful!");
      window.location.href = "/";
      return true;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      console.error("Signup error:", err);
      toast.error(err);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/logout");
      toast.success("Logout successful!");
      window.location.href = "/login";
      return true;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      console.error("Logout error:", err);
      toast.error(err);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
