"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { AxiosError } from "axios";
import axiosAuth from "@/lib/axiosAuth";

interface AuthState {
  loading: boolean;
  loadingRedirect: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (
    username: string,
    name: string,
    password: string,
    email: string
  ) => Promise<boolean>;
  logout: () => Promise<boolean>;
  refresh: () => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  loadingRedirect: false,
  user: null,
  token: null,

  login: async (username, password) => {
    set({ loading: true });
    try {
      const response = await axiosAuth.post("/login", {
        username,
        password,
      });
      const accessToken = response.data?.data?.access_token;
      localStorage.setItem("token", accessToken || "");
      localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
      toast.success("Login successful!");
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ loadingRedirect: true });
    try {
      const response = await axiosAuth.get("/google");

      if (response.data?.data?.url) {
        window.location.href = response.data.data.url;
        return true;
      }

      return false;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    } finally {
      set({ loadingRedirect: false });
    }
  },

  signup: async (username, name, password, email) => {
    set({ loading: true });
    try {
      const response = await axiosAuth.post(`/sign-up?email=${email}`, {
        username,
        name,
        password,
      });
      const accessToken = response.data?.data?.access_token;
      localStorage.setItem("token", accessToken || "");
      localStorage.setItem("user", JSON.stringify(response.data?.data?.user));
      toast.success("Signup successful!");
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosAuth.post("/logout");
      localStorage.removeItem("token");
      toast.success("Logout successful!");
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      const response = await axiosAuth.post("/refresh");
      const accessToken = response.data?.data?.access_token;
      if (accessToken) {
        localStorage.setItem("token", accessToken || "");
      }
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    }
  },

  deleteAccount: async () => {
    try {
      await axiosAuth.delete("/delete-account");
      localStorage.removeItem("token");
      toast.success("Account deleted successfully!");
      return true;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          error instanceof AxiosError ? error.message : String(error)
        );
      }
      return false;
    }
  },
}));
