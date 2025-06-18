"use client";

import { create } from "zustand";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { axiosAuthInstance } from "@/lib/axios";

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

  login: async (username, password) => {
    set({ loading: true });
    try {
      const response = await axiosAuthInstance.post("/login", {
        username,
        password,
      });
      const accessToken = response.data?.data?.access_token;
      const refreshToken = response.data?.data?.refresh_token;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
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
      const response = await axiosAuthInstance.get("/google");
      console.log("Google login response:", response);

      if (response.data?.data?.url) {
        console.log("Redirecting to Google login URL:", response.data.data.url);
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
      const response = await axiosAuthInstance.post(`/sign-up?email=${email}`, {
        username,
        name,
        password,
      });
      const accessToken = response.data?.data?.access_token;
      const refreshToken = response.data?.data?.refresh_token;
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
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
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosAuthInstance.post("/refresh", null, {
        headers: {
          "Refresh-token": refreshToken ?? "",
        },
      });
      const accessToken = response.data?.data?.access_token;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
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

  deleteAccount: async () =>
    new Promise<boolean>(async (resolve) => {
      set({ loading: true });
      try {
        const accessToken = localStorage.getItem("accessToken") ?? "";
        const response = await axiosAuthInstance.delete("/account", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.data?.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          toast.success("Account deleted successfully!");
          resolve(true);
        } else {
          toast.error("Failed to delete account");
          resolve(false);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            error instanceof AxiosError ? error.message : String(error)
          );
        }
        resolve(false);
      } finally {
        set({ loading: false });
      }
    }),
}));
