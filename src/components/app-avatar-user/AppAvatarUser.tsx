import { getAvatar } from "@/utils/avatar-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface AppAvatarProps {
  name?: string | null;
  username?: string | null;
  avatarType?: string | null;
}
export function AppAvatarUser({ name, username, avatarType }: AppAvatarProps) {
  username = username || "anonymous";
  avatarType = avatarType || "notionists";
  return (
    <>
      <Avatar>
        <AvatarImage
          src={getAvatar(username, avatarType)}
          alt={name ?? ""}
          className="rounded-full size-8"
        />
        <AvatarFallback className="rounded-full size-8 bg-black text-white flex items-center justify-center text-base">
          {name?.charAt(0).toUpperCase() || "?"}
        </AvatarFallback>
      </Avatar>
    </>
  );
}
