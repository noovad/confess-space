"use client";
import { create } from "zustand";
import { SpaceDto } from "@/dto/spaceDto";
import axiosApp from "@/lib/axiosApp";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface SpaceState {
  loading: boolean;
  followingSpaces: SpaceDto[];
  availableSpaces: SpaceDto[];
  space: SpaceDto | null;
  fetchFollowingSpaces: (userId?: string) => Promise<boolean>;
  fetchAvailableSpaces: () => Promise<boolean>;
  fetchSpaceBySlug: (slug: string) => Promise<boolean | null>;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  loading: false,
  followingSpaces: [],
  availableSpaces: [],
  space: null,

  fetchFollowingSpaces: async (userId) => {
    if (!userId) {
      return false;
    }

    set({ loading: true });
    try {
      const response = await axiosApp.get(`/user-space?userId=${userId}`);

      const data: SpaceDto[] = response.data.data.map(
        (item: { space: SpaceDto }) => item.space
      );

      set({ followingSpaces: data });
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

  fetchAvailableSpaces: async () => {
    set({ loading: true });
    try {
      const response = await axiosApp.get("/space");
      const data: SpaceDto[] = response.data.data;
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

  fetchSpaceBySlug: async (slug) => {
    set({ loading: true });
    try {
      const response = await axiosApp.get(`/space/slug/${slug}`);
      if (response.data.data) {
        set({ space: response.data.data });
        return true;
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
    } finally {
      set({ loading: false });
    }
  },
}));
