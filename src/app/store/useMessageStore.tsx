import { MessageDto } from "@/dto/messageDto";
import axiosApp from "@/lib/axiosApp";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";

interface MessageStore {
  messages: MessageDto[];
  addMessage: (spaceId: string, message: string) => Promise<boolean>;
  fetchMessages: (space: string) => Promise<boolean>;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],

  addMessage: async (spaceId, message) => {
    try {
      const response = await axiosApp.post("/message", {
        space_id: spaceId,
        message,
      });
      set((state) => ({
        messages: [...state.messages, response.data.data],
      }));
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
      const response = await axiosApp.get("/message/" + space);
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
}));
