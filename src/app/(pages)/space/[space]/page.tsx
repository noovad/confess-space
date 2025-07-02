"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate, formatReadableDate } from "@/utils/date-utils";
import Chat from "./components/Chat";
import { JoinSpaceDialog } from "./components/JoinSpaceDialog";
import { LeaveSpaceDialog } from "./components/LeaveSpaceDialog";
import { useMessageStore } from "@/app/store/useMessageStore";
import { useUserSpaceStore } from "@/app/store/useUserSpaceStore";
import { useInitializeSpace } from "./hooks/useInitializeSpace";
import { useChatWebSocket } from "./hooks/useChatWebSocket";
import {
  handleJoinSpace,
  handleLeaveSpace,
  handleSendMessage,
} from "./lib/spaceHandlers";

export default function SpacePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");

  const { user, isOwner, space } = useInitializeSpace();
  const { isMemberOf } = useUserSpaceStore();
  const { messages } = useMessageStore();
  const { wsStatus } = useChatWebSocket(user, space, isOwner, isMemberOf);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const onJoinSpace = () => handleJoinSpace(space, user);
  const onLeaveSpace = () => handleLeaveSpace(space, user);
  const onSendMessage = () => {
    handleSendMessage(message, space, user, () => setMessage(""));
  };

  return (
    <main className="h-screen p-4">
      <section className="flex flex-col h-full w-full">
        <Card
          className="mb-4 flex flex-row items-center justify-between px-4 py-2 bg-white shadow-sm rounded-lg"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{space?.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {(space?.member_count ?? 0) + 1} member
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {space?.description}
              </span>
            </div>
          </div>
          {!isOwner &&
            (isMemberOf ? (
              <LeaveSpaceDialog onLeave={onLeaveSpace} />
            ) : (
              <JoinSpaceDialog onJoin={onJoinSpace} />
            ))}
        </Card>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto flex-col flex p-4 gap-2"
        >
          {wsStatus === "error" && (
            <div className="text-center text-sm text-red-500 bg-red-50 px-3 py-1 rounded-md">
              Connection error. Some messages may not be displayed.
            </div>
          )}

          {wsStatus === "connecting" && (
            <div className="text-center text-sm text-blue-500 bg-blue-50 px-3 py-1 rounded-md">
              Connecting to chat...
            </div>
          )}

          {[...messages].reverse().map((msg, i, arr) => {
            const currentDate = formatDate(msg.created_at);
            const prevDate = arr[i - 1]
              ? formatDate(arr[i - 1].created_at)
              : null;
            const showDateDivider = currentDate !== prevDate;

            return (
              <React.Fragment key={msg.id}>
                {showDateDivider && (
                  <div className="text-center text-sm text-gray-500 my-4">
                    {formatReadableDate(currentDate)}
                  </div>
                )}
                <Chat message={msg} prevMessage={arr[i - 1]} />
              </React.Fragment>
            );
          })}
        </div>

        {isOwner || isMemberOf ? (
          <div className="pt-8 flex gap-4 justify-center items-center">
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
              spellCheck={false}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && message.trim()) {
                  e.preventDefault();
                  onSendMessage();
                }
              }}
            />
            <Button
              size="icon"
              disabled={!message.trim() || wsStatus !== "connected"}
              onClick={onSendMessage}
              title={
                wsStatus !== "connected"
                  ? "Waiting for connection..."
                  : undefined
              }
            >
              <Send />
            </Button>
          </div>
        ) : (
          <div className="h-16 flex justify-center items-center text-sm text-muted-foreground">
            You need to join the space to send messages.
          </div>
        )}
      </section>
    </main>
  );
}
