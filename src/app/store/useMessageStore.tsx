import { MessageDto } from "@/dto/messageDto";
import { UserDto } from "@/dto/userDto";
import axiosApp from "@/lib/axiosApp";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface MessageStore {
  activeUsers: UserDto[];
  messages: MessageDto[];
  addMessage: (
    spaceId: string,
    message: string,
    spaceSlug: string
  ) => Promise<boolean>;
  fetchMessages: (space: string) => Promise<boolean>;
  setActiveUsers?: (users: UserDto[]) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  activeUsers: [],

  addMessage: async (spaceId, message, spaceSlug) => {
    try {
      await axiosApp.post("/message?channel=" + spaceSlug, {
        space_id: spaceId,
        message,
      });
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

  fetchMessages: async (space) => {
    try {
      const response = await axiosApp.get("/messages/" + space);
      const data: MessageDto[] = response.data.data as MessageDto[];

      set({ messages: data });
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

  setActiveUsers: (users) => set({ activeUsers: users }),
}));
