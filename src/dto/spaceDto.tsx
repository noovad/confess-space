import { UserDto } from "./userDto";

export interface SpaceDto {
  name: string;
  slug: string;
  numberOfUsers?: number;
  users?: UserDto[];
  owner?: UserDto;
  description?: string;
  createdAt?: string;
}
