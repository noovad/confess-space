"use client";

import { create } from "zustand";
import { SpaceDto } from "@/dto/spaceDto";
import { axiosInstance } from "@/lib/axios";

export interface SpaceState {
  loading: boolean;
  followingSpaces: SpaceDto[];
  suggestedSpaces: SpaceDto[];
  fetchFollowingSpaces: () => Promise<boolean>;
  fetchSuggestedSpaces: () => Promise<boolean>;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  loading: false,
  followingSpaces: [],
  suggestedSpaces: [],

  fetchFollowingSpaces: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/space");
      const data: SpaceDto[] = response.data.data;
      set({ followingSpaces: data });
      return true;
    } catch (error) {
      console.error("Failed to fetch following spaces", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchSuggestedSpaces: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/space");
      const data: SpaceDto[] = response.data.data;
      set({ suggestedSpaces: data });
      return true;
    } catch (error) {
      console.error("Failed to fetch suggested spaces", error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
