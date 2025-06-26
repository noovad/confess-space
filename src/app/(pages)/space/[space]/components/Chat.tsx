import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";
import { MessageDto } from "@/dto/messageDto";
import { getUserFromClientCookie } from "@/utils/getUser";
import { formatTimeOnly } from "@/utils/time-utils";

interface ChatProps {
  message: MessageDto;
  nextMessage?: MessageDto;
}

export default function Chat({ message, nextMessage }: ChatProps) {
  function isSender(username: string): boolean {
    const user = getUserFromClientCookie();
    return user ? username === user.username : false;
  }

  function isSameUser(): boolean {
    return !!(
      nextMessage?.user &&
      message.user &&
      nextMessage.user.username === message.user.username
    );
  }

  if (!message.user) {
    return null;
  }

  const showName = !isSameUser();

  return isSender(message.user.username) ? (
    <div className="flex justify-end mb-4 items-start">
      <div className="bg-white border rounded-xl rounded-br-none py-2 px-4 me-4">
        {showName && (
          <div className="text-xs text-gray-400 mb-1">{message.user.name}</div>
        )}
        {message.content}
        <small className="flex justify-start text-xs text-gray-500 mt-1">
          {formatTimeOnly(message.created_at)}
        </small>
      </div>
      {showName ? (
        <AppAvatarUser
          name={message.user.name}
          username={message.user.username}
          avatarType={message.user.avatar_type}
        />
      ) : (
        <div className="size-8" />
      )}
    </div>
  ) : (
    <div className="flex justify-start mb-2 items-start">
      {showName ? (
        <AppAvatarUser
          name={message.user.name}
          username={message.user.username}
          avatarType={message.user.avatar_type}
        />
      ) : (
        <div className="size-8" />
      )}
      <div className="bg-white border rounded-xl rounded-bl-none py-2 px-4 ms-4">
        {showName && (
          <div className="text-xs text-gray-400 mb-1">{message.user.name}</div>
        )}
        {message.content}
        <small className="flex justify-end text-xs text-gray-500 mt-1">
          {formatTimeOnly(message.created_at)}
        </small>
      </div>
    </div>
  );
}
