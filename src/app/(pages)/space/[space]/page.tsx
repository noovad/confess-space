"use client";

import React, { useEffect, useRef, useState } from "react";
import Chat from "./components/Chat";
import { messages } from "@/data/messages";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formatDate, formatReadableDate } from "@/utils/date-utils";
import { JoinSpaceDialog } from "./components/JoinSpaceDialog";
import { LeaveSpaceDialog } from "./components/LeaveSpaceDialog";
import { Card } from "@/components/ui/card";
import { UserDto } from "@/dto/userDto";
import { getUserFromClientCookie } from "@/utils/getUser";
import { useSpaceStore } from "@/app/store/useSpaceStore";
import { useUserSpaceStore } from "@/app/store/useUserSpaceStore";

export default function SpacePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<UserDto | null>(null);
  const { space, fetchSpaceBySlug } = useSpaceStore();
  const pathname = window.location.pathname;
  const {
    isMemberOf,
    checkUserInSpace,
    fetchUserSpaces,
    userSpaces,
    joinToSpace,
    leaveFromSpace,
  } = useUserSpaceStore();

  useEffect(() => {
    const u = getUserFromClientCookie();
    setUser(u);
  }, []);

  useEffect(() => {
    fetchSpaceBySlug(pathname.split("/")[2]);
    console.log("Fetching space by slug:", pathname.split("/")[2]);
  }, [pathname, fetchSpaceBySlug]);

  useEffect(() => {
    if (user?.id && space?.id) {
      checkUserInSpace(space.id, user.id);
    }
  }, [user, space, checkUserInSpace]);

  useEffect(() => {
    if (space?.id) {
      fetchUserSpaces(space.id, "");
    }
  }, [space, fetchUserSpaces]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const handleJoinSpace = async () => {
    if (space?.id && user?.id) {
      const result = await joinToSpace(space.id, user.id);
      if (result) {
        console.log("User joined space:", space.name);
      }
    }
  };

  const handleLeaveSpace = async () => {
    if (space?.id && user?.id) {
      const result = await leaveFromSpace(space.id);
      if (result) {
        console.log("User left space:", space.name);
      }
    }
  };

  return (
    <main className="h-screen p-4">
      <section className="flex h-full w-full flex-col">
        <Card
          className="mb-4 flex flex-row items-center justify-between px-4 py-2 bg-white shadow-sm rounded-lg"
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">{space?.name}</h1>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {userSpaces.length}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                {space?.description}
              </span>
            </div>
          </div>
          {isMemberOf ? (
            <LeaveSpaceDialog onLeave={handleLeaveSpace} />
          ) : (
            <JoinSpaceDialog onJoin={handleJoinSpace} />
          )}
        </Card>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto flex flex-col-reverse gap-2 p-4"
        >
          {messages.slice().map((msg, i, arr) => {
            const currentDate = formatDate(msg.timestamp);
            const nextDate = arr[i + 1]
              ? formatDate(arr[i + 1].timestamp)
              : null;

            const showDateDivider = currentDate !== nextDate;

            return (
              <React.Fragment key={msg.id}>
                <Chat
                  message={msg}
                  nextMessage={showDateDivider ? undefined : arr[i + 1]}
                />

                {showDateDivider && (
                  <div className="text-center text-sm text-gray-500 my-4">
                    {formatReadableDate(currentDate)}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        {isMemberOf && (
          <div className="pt-8 flex gap-4 justify-center items-center">
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
              spellCheck="false"
            />
            <Button size="icon">
              <Send />
            </Button>
          </div>
        )}
      </section>
    </main>
  );
}
