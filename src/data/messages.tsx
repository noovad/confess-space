import { MessageDto } from "@/dto/messageDto";

export const messages: MessageDto[] = [
  {
    id: "1",
    senderName: "Alice",
    senderUsername: "Alice",
    avatarType: "cowe",
    content: "Hello, how are you?",
    timestamp: "2024-06-10T10:00:00Z",
  },
  {
    id: "2",
    senderName: "Bob",
    senderUsername: "Bob",
    avatarType: "cowe",
    content: "I am fine, thanks! How about you?",
    timestamp: "2024-06-10T10:01:00Z",
  },
  {
    id: "3",
    senderName: "Alice",
    senderUsername: "Alice",
    avatarType: "cowe",
    content: "I am good too!",
    timestamp: "2024-06-10T10:02:00Z",
  },
];
