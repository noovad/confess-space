import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";
import { userLogin } from "@/data/user";
import { MessageDto } from "@/dto/messageDto";
import { formatTimeOnly } from "@/utils/time-utils";

interface ChatProps {
  message: MessageDto;
  nextMessage?: MessageDto;
}

export default function Chat({ message, nextMessage }: ChatProps) {
  function isSender(username: string): boolean {
    return username === userLogin.username;
  }

  function isSameUser(): boolean {
    return nextMessage?.user.username === message.user.username;
  }
  return isSender(message.user.username) ? (
    <div className="flex justify-end mb-4 items-start">
      <div className="bg-white border rounded-bl-3xl rounded-tl-3xl rounded-tr-xl py-2 px-4 me-4">
        {message.message}
        <small className="flex justify-start text-xs text-gray-500 mt-1">
          {formatTimeOnly(message.timestamp)}
        </small>
      </div>
      {isSameUser() ? (
        <div className="size-8" />
      ) : (
        <AppAvatarUser
          name={message.user.name}
          username={message.user.username}
          avatarType={message.user.avatarType}
        />
      )}
    </div>
  ) : (
    <div className="flex justify-start mb-2 items-start">
      {isSameUser() ? (
        <div className="size-8" />
      ) : (
        <AppAvatarUser
          name={message.user.name}
          username={message.user.username}
          avatarType={message.user.avatarType}
        />
      )}
      <div className="bg-white border rounded-tl-xl rounded-br-3xl rounded-tr-3xl py-2 px-4 ms-4">
        {message.message}
        <small className="flex justify-end text-xs text-gray-500 mt-1">
          {formatTimeOnly(message.timestamp)}
        </small>
      </div>
    </div>
  );
}
