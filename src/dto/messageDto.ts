import { UserDto } from "./userDto";

export interface MessageDto {
  id: string;
  user: UserDto;
  message: string;
  timestamp: string;
}
