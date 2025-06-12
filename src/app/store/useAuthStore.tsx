// app/store/useAuthStore.ts
import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface AuthState {
  loading: boolean;
  loadingWithGoogle: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  loadingWithGoogle: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true });
    try {
      await axios.post("http://localhost:8080/login", { username, password });
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.message : String(error));
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ loadingWithGoogle: true });
    try {
      const response = await axios.get("http://localhost:8080/auth", {
        withCredentials: true,
      });
      
      if (response.data?.data?.url) {
        window.location.href = response.data.data.url;
      }

      return true;
    } catch (error) {
      toast.error(error instanceof AxiosError ? error.message : String(error));
      return false;
    } finally {
      set({ loadingWithGoogle: false });
    }
  },
}));
