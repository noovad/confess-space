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
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  loadingRedirect: false,

  login: async (username, password) => {
    set({ loading: true });
    try {
      await axiosAuthInstance.post("/login", { username, password });
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
    set({ loadingRedirect: true });
    try {
      const response = await axiosAuthInstance.get("/auth");

      if (response.data?.data?.url) {
        window.location.href = response.data.data.url;
        return true;
      }
      return false;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      toast.error(err);
      return false;
    } finally {
      set({ loadingRedirect: false });
    }
  },

  signup: async (username, name, password, email) => {
    set({ loading: true });

    try {
      await axiosAuthInstance.post(`/sign-up?email=${email}`, {
        username,
        name,
        password,
      });
      toast.success("Signup successful!");
      return true;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      toast.error(err);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosAuthInstance.post("/logout");
      toast.success("Logout successful!");
      return true;
    } catch (error) {
      const err = error instanceof AxiosError ? error.message : String(error);
      toast.error(err);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
