"use client";

import { create } from "zustand";
import { SpaceDto } from "@/dto/spaceDto";
import axiosApp from "@/lib/axiosApp";
import { UseAuthStore } from "./useAuthStore";

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
    const { user } = UseAuthStore.getState();
    try {
      const response = await axiosApp.get("/user-space?userId=" + user?.id);
      console.log("Fetched following spaces:", response.data.data);
      const data: SpaceDto[] = response.data.data.map(
        (item: { space: SpaceDto }) => item.space
      );
      console.log("Mapped following spaces:", data);
      set({ followingSpaces: data });
      return true;
    } catch {
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchSuggestedSpaces: async () => {
    set({ loading: true });
    try {
      const response = await axiosApp.get("/space");
      const data: SpaceDto[] = response.data.data;
      set({ suggestedSpaces: data });
      return true;
    } catch {
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
