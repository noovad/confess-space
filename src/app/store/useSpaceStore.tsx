"use client";
import { create } from "zustand";
import { SpaceDto, SpaceListResponse } from "@/dto/spaceDto";
import axiosApp from "@/lib/axiosApp";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface SpaceState {
  loading: boolean;
  availableSpaces: SpaceListResponse | null;
  availableSpacesSidebar: SpaceDto[];
  space: SpaceDto | null;
  havedSpace: boolean;
  ownSpace: SpaceDto | null;
  fetchAvailableSpaces: (search?: string, page?: number) => Promise<boolean>;
  fetchAvailableSpacesSidebar: () => Promise<boolean>;
  fetchSpaceBySlug: (slug: string) => Promise<boolean | null>;
  createSpace: (name: string, description: string) => Promise<boolean>;
  checkSpaceExistsByOwner: () => Promise<boolean>;
  fetchOwnSpace: () => Promise<boolean>;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  loading: false,
  availableSpaces: null,
  availableSpacesSidebar: [],
  space: null,
  havedSpace: true,
  ownSpace: null,

  fetchAvailableSpaces: async (search, page) => {
    set({ loading: true });
    try {
      if (!search) {
        search = "";
      }
      if (!page) {
        page = 1;
      }

      const response = await axiosApp.get(
        `/space?search=${search}&limit=10&page=${page}`
      );
      const data: SpaceListResponse = response.data.data;
      set({ availableSpaces: data });
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

  fetchAvailableSpacesSidebar: async () => {
    set({ loading: true });
    try {
      const response = await axiosApp.get("/space?isSuggest=true");
      const data: SpaceListResponse = response.data.data;
      set({ availableSpacesSidebar: data.spaces });
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

  fetchSpaceBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosApp.get(`/space/slug/${slug}`);
      set({ space: response.data.data });
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

  createSpace: async (name, description) => {
    set({ loading: true });
    try {
      await axiosApp.post("/space", {
        name,
        description,
      });
      toast.success("Space created successfully");
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

  checkSpaceExistsByOwner: async () => {
    try {
      const response = await axiosApp.get("/space/exists");
      set({ havedSpace: response.data.data.exists === true });
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

  fetchOwnSpace: async () => {
    try {
      const response = await axiosApp.get(`/space/own`);
      set({ ownSpace: response.data.data });
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
