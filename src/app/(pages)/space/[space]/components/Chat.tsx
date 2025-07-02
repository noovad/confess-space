"use client";

import { AppAvatarUser } from "@/components/app-avatar-user/AppAvatarUser";
import { MessageDto } from "@/dto/messageDto";
import { getUserFromClientCookie } from "@/utils/getUser";
import { formatTimeOnly } from "@/utils/time-utils";

interface ChatProps {
  message: MessageDto;
  prevMessage?: MessageDto; // ganti dari "nextMessage"
}

export default function Chat({ message, prevMessage }: ChatProps) {
  const currentUser = getUserFromClientCookie();
  const isSender = message.user?.username === currentUser?.username;
  const isSameUser = prevMessage?.user?.username === message.user?.username;
  const showName = !isSameUser;

  if (!message.user) return null;

  return (
    <div
      className={`flex ${
        isSender ? "justify-end" : "justify-start"
      } mb-2 items-start`}
    >
      {/* Avatar (pengirim di kanan, penerima di kiri) */}
      {!isSender &&
        (showName ? (
          <AppAvatarUser
            name={message.user.name}
            username={message.user.username}
            avatarType={message.user.avatar_type}
          />
        ) : (
          <div className="size-8" />
        ))}

      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg border bg-white px-4 py-2 rounded-xl ${
          isSender
            ? "rounded-br-none me-4 text-right"
            : "rounded-bl-none ms-4 text-left"
        }`}
      >
        {showName && (
          <div className="text-xs text-gray-400 mb-1">{message.user.name}</div>
        )}
        <div className="whitespace-pre-line break-words">{message.content}</div>
        <small
          className={`mt-1 text-xs text-gray-500 ${
            isSender ? "flex justify-start" : "flex justify-end"
          }`}
        >
          {formatTimeOnly(message.created_at)}
        </small>
      </div>

      {isSender &&
        (showName ? (
          <AppAvatarUser
            name={message.user.name}
            username={message.user.username}
            avatarType={message.user.avatar_type}
          />
        ) : (
          <div className="size-8" />
        ))}
    </div>
  );
}
