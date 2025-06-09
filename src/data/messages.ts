import { MessageDto } from "@/dto/messageDto";
import { user1, user2, userLogin } from "./user";

const timestamps = [
  "2025-06-10T10:12:00Z",
  "2025-06-13T10:15:00Z",
  "2025-06-15T10:16:00Z",
  "2025-06-18T10:17:00Z",
];

export const messages: MessageDto[] = [
  {
    id: "18a",
    user: userLogin,
    message: "userlogin: Awesome, thanks!",
    timestamp: timestamps[0],
  },
  {
    id: "18b",
    user: userLogin,
    message: "userlogin: Awesome, thanks!",
    timestamp: timestamps[0],
  },
  {
    id: "18",
    user: userLogin,
    message: "userlogin: Awesome, thanks!",
    timestamp: timestamps[0],
  },
  {
    id: "17",
    user: user2,
    message: "user2: Feel free to join in!",
    timestamp: timestamps[1],
  },
  {
    id: "16a",
    user: user1,
    message: "user1: Just chatting about our projects.",
    timestamp: timestamps[1],
  },
  {
    id: "16",
    user: user1,
    message: "user1: Just chatting about our projects.",
    timestamp: timestamps[1],
  },
  {
    id: "15",
    user: userLogin,
    message: "userlogin: What are you all discussing?",
    timestamp: timestamps[1],
  },
  {
    id: "14",
    user: userLogin,
    message: "userlogin: Thanks! Glad to be here.",
    timestamp: timestamps[2],
  },
  {
    id: "13",
    user: user2,
    message: "user2: Hi userlogin!",
    timestamp: timestamps[2],
  },
  {
    id: "12",
    user: user1,
    message: "user1: Welcome, userlogin!",
    timestamp: timestamps[2],
  },
  {
    id: "11",
    user: userLogin,
    message: "userlogin: Hey everyone, just joined the chat!",
    timestamp: timestamps[2],
  },
  {
    id: "10",
    user: user2,
    message: "user2: Let me know what you think.",
    timestamp: timestamps[2],
  },
  {
    id: "9",
    user: user1,
    message: "user1: Not yet, I'll check them out.",
    timestamp: timestamps[2],
  },
  {
    id: "8",
    user: user2,
    message: "user2: By the way, have you seen the latest updates?",
    timestamp: timestamps[2],
  },
  {
    id: "7",
    user: user1,
    message: "user1: Sure, sounds good.",
    timestamp: timestamps[2],
  },
  {
    id: "6",
    user: user2,
    message: "user2: Same here! Let's catch up later.",
    timestamp: timestamps[3],
  },
  {
    id: "5",
    user: user1,
    message: "user1: Just working on a project. You?",
    timestamp: timestamps[3],
  },
  {
    id: "4",
    user: user2,
    message: "user2: What are you up to today?",
    timestamp: timestamps[3],
  },
  {
    id: "3",
    user: user1,
    message: "user1: I am good too!",
    timestamp: timestamps[3],
  },
  {
    id: "2",
    user: user2,
    message: "user2: I am fine, thanks! How about you?",
    timestamp: timestamps[3],
  },
  {
    id: "1",
    user: user1,
    message: "user1: Hello, how are you?",
    timestamp: timestamps[3],
  },
];
